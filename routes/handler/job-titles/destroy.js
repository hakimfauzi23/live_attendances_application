const { JobTitle } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const jobTitle = await JobTitle.findByPk(id, {
    attributes: ["id", "name", "description", "division_id"],
  });

  if (!jobTitle) {
    return res
      .status(404)
      .json({ status: "error", message: "job title not found" });
  }

  const jobTitleName = jobTitle.name;
  await JobTitle.destroy({
    where: { id },
  });

  return res.json({
    status: "success",
    message: `successfully deleted ${jobTitleName} from job_titles table`,
  });
};
