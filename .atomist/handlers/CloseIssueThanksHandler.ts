import {Atomist} from '@atomist/rug/operations/Handler'
import {TreeNode} from '@atomist/rug/tree/PathExpression'
declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/Issue()[/resolvedBy::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]?[/by::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?][/belongsTo::Repo()/channel::ChatChannel()]", m => {
   let issue = m.root() as any

   if (issue.state() != "closed") {
     return
   }

   let message = atomist.messageBuilder().regarding(issue)
   
   message.say("Thanks " + issue.resolvedBy() + " for closing this issue!")

   let cid = "issue/" + issue.belongsTo().owner() + "/" + issue.belongsTo().name() + "/" + issue.number()

   message.withCorrelationId(cid).send()
})
