const entities = require('@jetbrains/youtrack-scripting-api/entities');
const http = require('@jetbrains/youtrack-scripting-api/http');

exports.rule = entities.Issue.onChange({
  title: 'Sends message when issues enter specific states',
  guard: (ctx) => {
    // TODO specify the conditions for executing the rule
    return ctx.issue.becomesReported || ctx.issue.becomesResolved || ctx.issue.becomesUnresolved;
  },
  action: (ctx) => {
    const issue = ctx.issue;
    const updatedBy = 'By '+ctx.issue.updatedBy.email;
    const summary = 'Task '+ctx.issue.summary;
    let action;
    const connection = new http.Connection('GOOGLE_CHAT_URL', null, 2000);
    connection.addHeader('Content-Type', 'application/json');
    if (issue.becomesReported) {
      action = 'Issue Created';
    } else if (issue.becomesResolved) {
      action = 'Issue Resolved';
    } else if (issue.becomesUnresolved) {
      action = 'Issue Reopened';
    } else if (issue.becomesRemoved) {
      action = 'Issue Deleted';
    }
    
    const message = action+"\n"+updatedBy+"\n"+summary+"\n"+ctx.issue.url;
    connection.postSync('', null, JSON.stringify({ text: message }));
  },
  requirements: {
    // TODO: add requirements
  }
});
