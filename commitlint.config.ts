import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  /*
   * Resolve and load conventional-changelog-atom from node_modules.
   * Referenced packages must be installed
   */
  // parserPreset: 'conventional-changelog-atom',
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    // REFERENCE https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum
    /*
      Define Rules like this:
      
      - Level [0..2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
      - Applicable always|never: never inverts the rule.
      - Value: value to use for this rule.
     
      Example [0, "always", 'lowerCase']
    */
    'type-enum': [2, 'always', ['feat', 'chore', 'fix', 'build', 'perf', 'revert', 'test', 'docs', 'dev', 'refactor']],
    'type-case': [2, 'always', 'lowerCase'],
    'subject-empty': [2, 'never'],
    'subject-case': [0, 'always', ['lower-case', 'upper-case']],
    'body-max-line-length': [0, 'always', 100]
  },
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [(commit) => commit === ''],
  /*
   * Whether commitlint uses the default ignore rules.
   */
  defaultIgnores: true,
  /*
   * Custom URL to show upon failure
   */
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  /*
   * Custom prompt configs
   */
  prompt: {
    messages: {},
    questions: {
      type: {
        description: 'please input type:'
      }
    }
  }
}

module.exports = Configuration
