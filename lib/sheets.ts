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
}

export interface ProjectDetailsFromSheets {
  id: string;
  description: string;
  location: string;
  year: string;
  duration: string;
  challenge: string;
  solution: string;
}

export interface MergedProjectFromSheets {
  // From images sheet (tab 1):
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
  // From details sheet (tab 2):
  description: string;
  location: string;
  year: string;
  duration: string;
  challenge: string;
  solution: string;
}

let cachedProjects: MergedProjectFromSheets[] | null = null;
const CACHE_DURATION = 5 * 60 * 1000;
let lastFetchTime = 0;

function parseImageUrls(value: string | undefined): string[] {
  const str = value || '';
  return str ? str.split(',').map((url: string) => url.trim()).filter(Boolean) : [];
}

async function getDetailsRows(doc: GoogleSpreadsheet, detailsSheetId: string): Promise<Map<string, ProjectDetailsFromSheets>> {
  const detailsMap = new Map<string, ProjectDetailsFromSheets>();

  try {
    const detailsSheet = doc.sheetsById[parseInt(detailsSheetId)];
    if (!detailsSheet) {
      console.warn('Details sheet not found, using empty details');
      return detailsMap;
    }

    const rows = await detailsSheet.getRows();

    for (const row of rows) {
      const id = row.get('id');
      if (id) {
        detailsMap.set(id, {
          id,
          description: row.get('description') || '',
          location: row.get('location') || '',
          year: row.get('year') || '',
          duration: row.get('duration') || '',
          challenge: row.get('challenge') || '',
          solution: row.get('solution') || '',
        });
      }
    }
  } catch (error) {
    console.error('Error fetching details from Google Sheets:', error);
  }

  return detailsMap;
}

export async function getProjectsFromSheets(): Promise<MergedProjectFromSheets[]> {
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

    const imageProjects: ProjectFromSheets[] = rows.map(row => {
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
      };
    });

    // Fetch details from the second sheet if configured
    const DETAILS_SHEET_ID = process.env.GOOGLE_SHEETS_DETAILS_SHEET_ID;
    let detailsMap = new Map<string, ProjectDetailsFromSheets>();

    if (DETAILS_SHEET_ID) {
      detailsMap = await getDetailsRows(doc, DETAILS_SHEET_ID);
    }

    // Merge image projects with details
    const projects: MergedProjectFromSheets[] = imageProjects.map(imageProject => {
      const details = detailsMap.get(imageProject.id);
      return {
        ...imageProject,
        description: details?.description || '',
        location: details?.location || '',
        year: details?.year || '',
        duration: details?.duration || '',
        challenge: details?.challenge || '',
        solution: details?.solution || '',
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
