import type { Frequency } from './common';

interface BaseDBDataType {
  id: number | null;
  cons_time: Date;
  modi_time: Date;
}

interface CashFlow extends BaseDBDataType {
  name: string;
  value: number;
  currency: string;
  startDate: Date;
  isRecurring: boolean;
  recurringRate: Frequency | null;
}

export type { BaseDBDataType, CashFlow }
