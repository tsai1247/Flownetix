import type { Frequency } from './common';
import { FlowType } from './common';

interface BaseDBDataType {
  id: number | null;
  cons_time: Date;
  modi_time: Date;
}

interface CashFlow extends BaseDBDataType {
  name: string;
  flowType: FlowType,
  amount: number;
  currency: string;
  startDate: Date;
  isRecurring: boolean;
  recurringRate: Frequency | null;
}

export type { BaseDBDataType, CashFlow }
