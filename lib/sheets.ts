import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface ProjectFromSheets {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  timelineImages: string[];
  kitchenImages: string[];
  bathroomImages: string[];
  officeImages: string[];
  livingRoomImages: string[];
  description: string;
}

let cachedProjects: ProjectFromSheets[] | null = null;
const CACHE_DURATION = 5 * 60 * 1000;
let lastFetchTime = 0;

function parseImageUrls(value: string | undefined): string[] {
  const str = value || '';
  return str ? str.split(',').map((url: string) => url.trim()).filter(Boolean) : [];
}

export async function getProjectsFromSheets(): Promise<ProjectFromSheets[]> {
  if (cachedProjects && (Date.now() - lastFetchTime) < CACHE_DURATION) {
    return cachedProjects;
  }

  const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
  // When storing PEM keys in environment variables newlines are often escaped as "\\n".
  // Normalize the value so crypto signing receives a proper PEM string.
  const privateKey = rawPrivateKey.includes('\\n')
    ? rawPrivateKey.replace(/\\n/g, '\n')
    : rawPrivateKey;

  const CREDENTIALS = {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: privateKey,
  };

  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

  if (!CREDENTIALS.client_email || !CREDENTIALS.private_key || !SPREADSHEET_ID || !SHEET_ID) {
    console.warn('Google Sheets credentials not configured');
    return [];
  }

  // Do not log the private key. Log only whether credentials appear present.
  console.log('Google Sheets credentials loaded for', CREDENTIALS.client_email);

  if (privateKey && !privateKey.startsWith('-----')) {
    console.warn('GOOGLE_SHEETS_PRIVATE_KEY does not look like a PEM key. \nMake sure you provided the service account private key (PEM) and, if you put it in an env var, that you escaped newlines as "\\n".');
  }

  try {
    const jwt = new JWT({
      email: CREDENTIALS.client_email,
      key: CREDENTIALS.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();

    const sheet = doc.sheetsById[parseInt(SHEET_ID)];
    const rows = await sheet.getRows();

    const projects: ProjectFromSheets[] = rows.map(row => {
      return {
        id: row.get('id') || '',
        title: row.get('title') || '',
        category: row.get('category') || '',
        beforeImage: row.get('beforeImage') || '',
        afterImage: row.get('afterImage') || '',
        timelineImages: parseImageUrls(row.get('timelineImages')),
        kitchenImages: parseImageUrls(row.get('kitchenImages')),
        bathroomImages: parseImageUrls(row.get('bathroomImages')),
        officeImages: parseImageUrls(row.get('officeImages')),
        livingRoomImages: parseImageUrls(row.get('livingRoomImages')),
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
