import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Types for our project data from sheets
export interface ProjectImageData {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  timelineImages: string[];
  description: string;
}

// Cache the fetched data
let cachedProjects: ProjectImageData[] | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let lastFetchTime = 0;

export async function getProjectsFromSheets(): Promise<ProjectImageData[]> {
  // Return cached data if it's still valid
  if (cachedProjects && (Date.now() - lastFetchTime) < CACHE_DURATION) {
    return cachedProjects;
  }

  // Your service account credentials
  const CREDENTIALS = {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

  try {
    const jwt = new JWT({
      email: CREDENTIALS.client_email,
      key: CREDENTIALS.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID!, jwt);
    await doc.loadInfo();
    
    const sheet = doc.sheetsById[SHEET_ID!];
    const rows = await sheet.getRows();

    const projects: ProjectImageData[] = rows.map(row => ({
      id: row.get('id'),
      title: row.get('title'),
      beforeImage: row.get('beforeImage'),
      afterImage: row.get('afterImage'),
      timelineImages: row.get('timelineImages').split(',').map((url: string) => url.trim()),
      description: row.get('description'),
    }));

    // Update cache
    cachedProjects = projects;
    lastFetchTime = Date.now();

    return projects;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    // Return cached data if available, even if expired
    if (cachedProjects) {
      return cachedProjects;
    }
    throw error;
  }
}