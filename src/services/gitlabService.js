import { handleLabelEvent } from '../handlers/labelHandler.js';
import MergeRequest from '../models/MergeRequest.js';

export const handleGitlabEvent  = async (event) => {
    const { object_kind, ...details } = event;

    if (object_kind === 'merge_request') {
        const { object_attributes, assignees, changes } = details;
        const mrId = object_attributes.id;


        // Нужно подумать как хранить, тк могут быть разные события на одном МР
        const existingMR = await MergeRequest.findByPk(mrId);
        if (existingMR && existingMR.processed) {
            return;
        }

        if (
            (object_attributes.action === 'update' && changes && changes.labels && changes.labels.current)
            || object_attributes.action === 'open' && object_attributes.labels
            || object_attributes.action === 'reopen' && object_attributes.labels
        ) {
            const currentLabels = changes.labels?.current || object_attributes.labels;
            await handleLabelEvent(currentLabels, assignees[0], object_attributes);
        }
    }

}
