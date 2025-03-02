function skillsMember() {
  return {
    member: {
      skills: {
        name: 'skills',
        type: new List(Skill),
        resolve: (source, args, context, info) => {
                    return Skill.find({});
                  }
                }
              }
            };
          }