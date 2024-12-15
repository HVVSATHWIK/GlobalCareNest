import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery();
const datasetId = 'healthcare_analytics';

export const logDiagnosticEvent = async (diagnosticData: any) => {
  try {
    const tableId = 'diagnostic_events';
    const rows = [{
      timestamp: new Date().toISOString(),
      userId: diagnosticData.userId,
      diagnosticType: diagnosticData.type,
      result: diagnosticData.result,
      confidence: diagnosticData.confidence,
      metadata: JSON.stringify(diagnosticData.metadata),
    }];

    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);
  } catch (error) {
    console.error('Error logging diagnostic event:', error);
    throw error;
  }
};

export const queryDiagnosticTrends = async (
  startDate: string,
  endDate: string,
  diagnosticType?: string
) => {
  try {
    const query = `
      SELECT
        DATE(timestamp) as date,
        diagnosticType,
        COUNT(*) as count,
        AVG(confidence) as avg_confidence
      FROM \`${datasetId}.diagnostic_events\`
      WHERE timestamp BETWEEN @startDate AND @endDate
      ${diagnosticType ? 'AND diagnosticType = @diagnosticType' : ''}
      GROUP BY date, diagnosticType
      ORDER BY date DESC
    `;

    const options = {
      query,
      params: { startDate, endDate, diagnosticType },
    };

    const [rows] = await bigquery.query(options);
    return rows;
  } catch (error) {
    console.error('Error querying diagnostic trends:', error);
    throw error;
  }
};