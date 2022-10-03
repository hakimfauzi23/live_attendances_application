const { Setting } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const setting = await Setting.findByPk(id);

  if (!setting) {
    return res
      .status(404)
      .json({ status: "error", message: "setting not found" });
  }

  const settingName = setting.name;
  await Setting.destroy({
    where: { id },
  });

  return res.json({
    status: "success",
    message: `successfully deleted ${settingName} Setting`,
  });
};
