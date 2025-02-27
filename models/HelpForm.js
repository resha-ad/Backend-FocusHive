export default (sequelize, DataTypes) => {
    const HelpForm = sequelize.define("HelpForm", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        subject: DataTypes.STRING,
        message: DataTypes.TEXT,
    });
    return HelpForm;
};