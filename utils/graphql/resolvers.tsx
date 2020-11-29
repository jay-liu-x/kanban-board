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
  },
};

export default resolvers;
