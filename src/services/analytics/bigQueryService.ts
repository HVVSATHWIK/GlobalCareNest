export const logDiagnosticEvent = async (diagnosticData: unknown) => {
  console.warn(
    '[bigQueryService] BigQuery client cannot run in the browser. ' +
      'Send analytics to a backend (recommended) or store them in Firestore.'
  );
  void diagnosticData;
};

export const queryDiagnosticTrends = async (
  startDate: string,
  endDate: string,
  diagnosticType?: string
) => {
  console.warn(
    '[bigQueryService] BigQuery queries cannot run in the browser. Returning empty trends.'
  );
  void startDate;
  void endDate;
  void diagnosticType;
  return [];
};