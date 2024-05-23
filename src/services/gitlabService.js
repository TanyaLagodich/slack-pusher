import { handleLabelEvent } from '../handlers/labelHandler.js';
import MergeRequest from '../models/MergeRequest.js';

export const handleGitlabEvent  = async (event) => {
    const { object_kind, ...details } = event;

    if (object_kind === 'merge_request') {
        const { object_attributes, assignees, changes } = details;
        const mrId = object_attributes.id;

        const existingMR = await MergeRequest.findByPk(mrId);
        if (existingMR && existingMR.processed) {
            return;
        }


        if (changes && changes.labels && changes.labels.current) {
            const currentLabels = changes.labels.current;
            await handleLabelEvent(currentLabels, assignees[0], object_attributes);
        }
    }

}
