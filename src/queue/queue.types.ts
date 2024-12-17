import { Job } from 'bullmq';

export enum QueueType {
  USER = 'user',
  PRODUCT = 'product',
  ORDER = 'order',
  PAYMENT = 'payment'
}

export enum JobType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  PROCESS = 'process'
}

export interface BaseJobData {
  id: string;
  type: JobType;
  resourceType: QueueType;
}

export interface JobData extends BaseJobData {
  data: {
    iId: string;
    action: string;
    payload: any;
  };
}


export type DynamicJobData = JobData ;

export interface QueueOptions {
  attempts?: number;
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number;
  };
  timeout?: number;
}

export interface QueueProcessorInterface {
  process(job: Job): Promise<any>;
}
