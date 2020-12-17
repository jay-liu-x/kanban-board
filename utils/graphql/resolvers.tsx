import { ObjectID } from 'mongodb';

const resolvers = {
  Query: {
    columns(_parent, _args, _context, _info) {
      return _context.db
        .collection('columns')
        .findOne()
        .then((data) => {
          return data.columns;
        });
    },
    tasks(_parent, _args, _context, _info) {
      return _context.db
        .collection('tasks')
        .findOne()
        .then((data) => {
          return data.tasks;
        });
    },
  },

  Mutation: {
    addColumn(_parent, _args, _context, _info) {
      const colId = ObjectID(); // generate objectId
      return _context.db
        .collection('columns')
        .updateOne(
          { user: _args.user },
          {
            $push: {
              columns: {
                _id: colId,
                name: _args.colName,
                taskIds: [],
              },
            },
          }
        )
        .then((data) => {
          return data.result.nModified === 1; // return true if one item is modified
        });
    },
    deleteColumn(_parent, _args, _context, _info) {
      return _context.db
        .collection('columns')
        .updateOne(
          { user: _args.user },
          {
            $pull: {
              columns: {
                _id: ObjectID(_args.colId),
              },
            },
          }
        )
        .then((data) => {
          return data.result.nModified === 1; // return true if one item is modified
        });
    },
    updateColumns(_parent, _args, _context, _info) {
      /* Convert string ids to ObjectIds */
      const cols = _args.cols.map(({ _id, taskIds, ...rest }) => ({
        ...rest,
        _id: ObjectID(_id),
        taskIds: taskIds.map((taskId) => ObjectID(taskId)),
      }));

      return _context.db
        .collection('columns')
        .updateOne(
          {
            user: _args.user,
          },
          {
            $set: {
              columns: cols,
            },
          }
        )
        .then((data) => {
          return data.result.nModified === 1; // return true if one item is modified
        });
    },
    updateColumnName(_parent, _args, _context, _info) {
      /* Add task in corresponding column. */
      _context.db
        .collection('columns')
        .updateOne(
          {
            user: _args.user,
            'columns._id': ObjectID(_args.colId),
          },
          { $set: { 'columns.$.name': _args.colName } }
        )
        .then((data) => {
          return data.result.nModified === 1; // return true if one item is modified
        });
    },

    addTask(_parent, _args, _context, _info) {
      const taskId = ObjectID(); // generate objectId

      return _context.db
        .collection('tasks')
        .updateOne(
          { user: _args.user },
          {
            $push: {
              tasks: {
                _id: taskId,
                title: _args.taskTitle,
                body: _args.taskBody,
              },
            },
          }
        )
        .then((data) => {
          if (data.result.nModified !== 1) {
            return false;
          }
          /* Add task to corresponding column. */
          _context.db.collection('columns').updateOne(
            { user: _args.user, 'columns._id': ObjectID(_args.colId) },
            {
              $push: {
                'columns.$.taskIds': taskId,
              },
            }
          );
        });
    },
    updateTaskTitle(_parent, _args, _context, _info) {
      return _context.db
        .collection('tasks')
        .updateOne(
          {
            user: _args.user,
            'tasks._id': ObjectID(_args.taskId),
          },
          { $set: { 'tasks.$.title': _args.taskTitle } }
        )
        .then((data) => {
          return data.result.nModified === 1; // return true if one item is modified
        });
    },
    updateTaskBody(_parent, _args, _context, _info) {
      return _context.db
        .collection('tasks')
        .updateOne(
          {
            user: _args.user,
            'tasks._id': ObjectID(_args.taskId),
          },
          { $set: { 'tasks.$.body': _args.taskBody } }
        )
        .then((data) => {
          return data.result.nModified === 1; // return true if one item is modified
        });
    },
  },
};

export default resolvers;
