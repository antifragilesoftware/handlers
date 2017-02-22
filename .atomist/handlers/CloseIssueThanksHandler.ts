import {Atomist} from '@atomist/rug/operations/Handler'
import {TreeNode} from '@atomist/rug/tree/PathExpression'
declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/Issue()/belongsTo::Repo()/channel::ChatChannel()", m => {
   let issue = m.root() as any

   if (issue.state() != "closed") {
     return
   }

   atomist.messageBuilder()
    .say("Thanks for closing this issue on " +
         issue.belongsTo().name())
    .on(issue.belongsTo().channel().id()).send()
})
