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
  },
};

export default resolvers;
