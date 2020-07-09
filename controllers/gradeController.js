import gradeSchema from '../models/gradeSchema.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  const {name, subject, type, value} = req.body;

  if (!name || !subject || !type || !value) {
    return res.send('Some data is missing. Ex: name, subject, type and value');
  }

  try {
    logger.info(`POST /grade - ${JSON.stringify()}`);

    const grade = {
      name,
      subject,
      type,
      value,
    }

    const newGrade = await new gradeSchema(grade).save();

    return res.send(grade);

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const { name } = req.query;

  //condicao para o filtro no findAll
  // var condition = name
  //   ? { name: { $regex: new RegExp(name), $options: 'i' } }
  //   : {};
  
  try {
    logger.info(`GET /grade`);
    
    if (name) {
      const grades = await gradeSchema.find({name: name});
      return res.send(grades);
    } else {
      const grades = await gradeSchema.find();
      return res.send(grades);
    }
    
  } catch (error) {
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);

    return res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  
  try {
    logger.info(`GET /grade - ${id}`);

    const grade = await gradeSchema.findById(id);

    return res.send(grade);
  } catch (error) {
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    return res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const {name, type, subject, value} = req.body;

  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: 'ID inválido',
    });
  }

  try {
    const grade = {};

    !!name && (grade.name = name);
    !!type && (grade.type = type);
    !!subject && (grade.subject = subject);
    !!value && (grade.value = value);

    await gradeSchema.findByIdAndUpdate(id, grade);

    return res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const a = await gradeSchema.findByIdAndDelete(id);
    console.log(a);
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    await gradeSchema.deleteMany();

    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
