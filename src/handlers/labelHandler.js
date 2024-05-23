import SlackController from '../controllers/slack.js';
import { generateContent } from '../utils/generateContent.js';
import MergeRequest from '../models/MergeRequest.js';

export const handleLabelEvent  = async (currentLabels, assignees, objectAttributes) => {
    const labelNames = currentLabels.map(label => label.title);
    if (labelNames.includes('ready_to_review')) {
        await SlackController.sendMessageToChannel(generateContent(assignees, objectAttributes));
        await MergeRequest.upsert({
            id: objectAttributes.id,
            title: objectAttributes.title,
            processed: true,
        });
    }
}
