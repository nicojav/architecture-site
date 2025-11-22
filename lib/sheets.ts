import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface ProjectFromSheets {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  timelineImages: string[];
  description: string;
}

let cachedProjects: ProjectFromSheets[] | null = null;
const CACHE_DURATION = 5 * 60 * 1000;
let lastFetchTime = 0;

export async function getProjectsFromSheets(): Promise<ProjectFromSheets[]> {
  if (cachedProjects && (Date.now() - lastFetchTime) < CACHE_DURATION) {
    return cachedProjects;
  }

  const CREDENTIALS = {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

  if (!CREDENTIALS.client_email || !CREDENTIALS.private_key || !SPREADSHEET_ID || !SHEET_ID) {
    console.warn('Google Sheets credentials not configured');
    return [];
  }

  try {

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    await doc.useServiceAccountAuth({
  client_email: CREDENTIALS.client_email,
  private_key: CREDENTIALS.private_key,
});
  
    
    await doc.loadInfo();

    const sheet = doc.sheetsById[parseInt(SHEET_ID)];
    const rows = await sheet.getRows();

    const projects: ProjectFromSheets[] = rows.map(row => {
      const timelineImagesStr = row.get('timelineImages') || '';
      const timelineImages = timelineImagesStr
        ? timelineImagesStr.split(',').map((url: string) => url.trim()).filter(Boolean)
        : [];

      return {
        id: row.get('id') || '',
        title: row.get('title') || '',
        category: row.get('category') || '',
        beforeImage: row.get('beforeImage') || '',
        afterImage: row.get('afterImage') || '',
        timelineImages,
        description: row.get('description') || '',
      };
    });

    cachedProjects = projects;
    lastFetchTime = Date.now();

    return projects;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    if (cachedProjects) {
      return cachedProjects;
    }
    return [];
  }
}
