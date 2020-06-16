import * as Yup from 'yup';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class SessionDeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, email } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: { id: id, email: email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { name, avatar, createdAt } = deliveryman;

    return res.json({
      user: {
        id,
        createdAt,
        name,
        email,
        avatar,
      },
    });
  }
}

export default new SessionDeliverymanController();
