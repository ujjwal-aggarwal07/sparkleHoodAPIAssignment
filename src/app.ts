import express, { Application, Request, Response } from 'express';
import mysql from 'mysql2';

// Create Express app
const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ujjwal', // Set your MySQL root password here
  database: 'aicall' 
});

// Check MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('welcome from Ujjwal aggarwal 12001083');
});


// to fetch specific id
app.get('/incidents/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  db.query('SELECT * FROM incidents WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching incident: ', err);
      return res.status(500).json({ error: 'Database error' });
    }

    
    const incidentResults = results as mysql.RowDataPacket[]; 

    if (incidentResults.length === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.status(200).json(incidentResults[0]); 
  });
});



//to post new incidents 
app.post('/incidents', (req: Request, res: Response) => {
    const { title, description, severity } = req.body;
    if (!title || !description || !severity) {
        res.status(400).json({ error: 'Title, description, and severity are required' });
        return;
    }
    // res.status(400).json({ error: 'test' });
    // return;    
      const query = 'INSERT INTO incidents (title, description, status) VALUES (?, ?, ?)';
  db.query(query, [title, description, severity], (err, result) => {
    if (err) {
      console.error('Error inserting incident: ', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Create response with insertId from result
    const newIncident = {
      id: (result as mysql.OkPacket).insertId,
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    res.status(201).json(newIncident); // Return created incident
  });



});
//to get all incidents
app.get('/incidents', (req: Request, res: Response) => {
  db.query('SELECT * FROM incidents', (err, results) => {
    if (err) {
      console.error('Error fetching incidents: ', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

//to delete specific incidents
app.delete('/incidents/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  db.query('DELETE FROM incidents WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting incident: ', err);
      return res.status(500).json({ error: 'Database error' });
    }

    
      const deleteResult = result as mysql.OkPacket;
      

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.status(200).json({ message: 'Incident deleted successfully' });
  });
});



// Start server
const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
