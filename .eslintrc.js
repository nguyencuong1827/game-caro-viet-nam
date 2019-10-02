module.exports = {
    "extends": ["airbnb", "prettier", "prettier/react", "eslint:recommended",
    "plugin:react/recommended"],
    "plugins": ["prettier"],
    "rules": {
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [".js", ".jsx"]
        }
      ],
      "react/prop-types": 0,
      "no-underscore-dangle": 0,
      "import/imports-first": ["error", "absolute-first"],
      "import/newline-after-import": "error",
      "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false  }],
      "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["registration"] }],
    },
    "globals": {
      "window": true,
      "document": true,
      "localStorage": true,
      "FormData": true,
      "FileReader": true,
      "Blob": true,
      "navigator": true
    },
    "parser": "babel-eslint"
};