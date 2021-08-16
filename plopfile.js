// https://blog.logrocket.com/automatically-generate-your-own-react-components-with-plop-js-2da3b39914f3/
// git docs: https://plopjs.com/documentation/#getting-started
//TODO: FOR STORYBOOK! another guide: https://dev.to/abdulkareemtpm/generate-your-own-react-component-using-cli-by-using-plop-js-2ei

// How to run: yarn plop
module.exports = (plop) => {
  // create your generators here
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
    ],
    // list of actions to take
    actions: [
      // Creates the Component
      {
        // Add a new file
        type: "add",
        // Path for the new file. The pascalCase modifier is used to ensure name is formatted in PascalCase.
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        // path for file containing the template. Template used to generate content of new file
        templateFile: "plop-templates/Component.js.hbs",
      },
      // Creates the Type for the Component
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/types/{{pascalCase name}}Type.ts",
        templateFile: "plop-templates/Type.js.hbs",
      },

      // Creates the Test
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/tests/{{pascalCase name}}.test.js",
        templateFile: "plop-templates/Component.test.js.hbs",
      },

      // Creates the Story file
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/stories/{{pascalCase name}}.stories.js",
        templateFile: "plop-templates/Stories.js.hbs",
      },
      // Creates the Documentation mdx file for Story
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/stories/{{pascalCase name}}Doc.mdx",
        templateFile: "plop-templates/Documentation.mdx.hbs",
      },
    ],
  });
};
