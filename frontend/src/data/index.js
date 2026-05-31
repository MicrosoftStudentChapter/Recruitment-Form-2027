// Central data hub exporting all department configurations and task structures.
import { technicalDepartment, technicalTask } from './technical';
import { designDepartment, designTask } from './design';
import { contentDepartment, contentTask } from './content';
import { marketingDepartment, marketingTask } from './marketing';
import { mediaDepartment, mediaTask } from './media';

export const departments = [
  technicalDepartment,
  designDepartment,
  contentDepartment,
  marketingDepartment,
  mediaDepartment,
];

export const taskData = {
  technical: technicalTask,
  design: designTask,
  content: contentTask,
  marketing: marketingTask,
  media: mediaTask,
};

export * from './technical';
export * from './design';
export * from './content';
export * from './marketing';
export * from './media';
