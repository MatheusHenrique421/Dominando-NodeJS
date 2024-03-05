const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    //res.status(200).json(checklist);
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res.status(500).json(error);
  }
});

// rota new async
router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { errors: "Erro ao carregar o formulário" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", {
        errors: "Erro ao exibir a edição das listas de tarefas",
      });
  }
});

router.post("/", async (req, res) => {
  let { nome } = req.body.checklist;
  let checklist = new Checklist({ nome });

  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklists: { ...checklist, error } });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     let checklist = await Checklist.findById(req.params.id).populate('tasks');
//     res.status(200).render("checklists/show", { checklist: checklist });
//   } catch (error) {
//     res
//       .status(500)
//       .render("pages/error", { errors: "Erro ao exibir as listas de tarefas" });
//   }
// });
router.get("/:id", async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id).populate('tasks');

    if (!checklist) {
      return res.status(404).render("pages/error", { errors: "Checklist não encontrado" });
    }

    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    console.error(error);
    res.status(500).render("pages/error", { errors: "Erro ao exibir as listas de tarefas" });
  }
});


// router.put("/:id", async (req, res) => {
//   let { nome } = req.body.checklist;
//   let checklist = await Checklist.findById(req.params.id);

//   try {
//     await checklist.save({nome})
//     res.redirect('/checklists');
//   } catch (error) {
//     let errors = error.errors;
//     res.status(422).render("checklists/edit", {checklist: {...checklist, errors}});
//   }
// });

router.put("/:id", async (req, res) => {
  let { nome } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);

  try {
    await Checklist.updateOne({ _id: req.params.id }, { nome });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklists/edit", { checklist: { ...checklist, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklists = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    res.status(500).render("pages/error", { error: "Erro ao deletar a lista de tarefas." });
  }
});

module.exports = router;
