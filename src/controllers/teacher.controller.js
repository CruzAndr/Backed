const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findUnique({
      where: {

        id: parseInt(req.params.id),

      },
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teachers' });
  }
};


/** 
exports.postTeacherLogin = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findFirst({
      select: {
        id: parseInt(req.params.id),
        password: req.params.password
      },
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error  + 'Failed to retrieve teachers' });
  }
};
*/



exports.getTeacherByPasword = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany(
      { where: { id:req.body.id,pasword:req.body.pasword }}
    );
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teachers' });
  }
};

const bcrypt = require('bcrypt');

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;

    // Encriptar la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number
      }
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error al crear profesor:', error);
    res.status(400).json({ error: 'Failed to create teacher' });
  }
};


exports.updateTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: req.body
    });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update teacher' });
  }
};

exports.deleteTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.teacher.deleteMany();
    //await prisma.teacher.delete({ where: { id } });
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete teacher' });
  }
};
