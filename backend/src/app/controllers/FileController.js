import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    if (!req.file) return res.json({ error: 'Please upload a file' });

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}
export default new FileController();
