import type { JSDOM } from 'jsdom';

export interface ISeoAnalyzerOptions {
  verbose?: boolean;
}

export interface IReport {
  errorMessage: string;
  htmlCssSelector: string;
  failingValue: string;
  rule: string;
}

export interface IResult {
  source: string;
  report: IReport[];
}

// biome-ignore lint: TODO: Setup mapping between functions and their options
export type TRuleFunc = (dom: JSDOM, options?: any) => Promise<IReport[] | []>;

export interface IRule {
  rule: TRuleFunc;
  options?: { [key: string]: unknown };
}

export interface IInputData {
  source: string;
  dom: JSDOM;
}

export interface IInputHtml {
  source: string;
  text: string;
}
