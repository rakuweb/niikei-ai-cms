module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'Which component category?',
        choices: ['components', 'features'],
      },
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the name of component?',
      },
      {
        type: 'input',
        name: 'directory1',
        message: 'Where is the directory1? (No problem in blanck)',
      },
      {
        type: 'input',
        name: 'directory2',
        message: 'Where is the directory2? (No problem in blanck)',
      },
      {
        type: 'confirm',
        name: 'make_stories',
        message: 'Do you make stories file?',
      },
      {
        type: 'confirm',
        name: 'make_styles',
        message: 'Do you make styles file?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { category, component_name, directory1, directory2 } = answers;
      const path = `${category}/${directory1 ? `${directory1}/` : ``}${
        directory2 ? `${directory2}/` : ``
      }${component_name}`;
      const abs_path = `src/${path}`;

      return { ...answers, path, abs_path };
    });
  },
};
