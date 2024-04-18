const { sequelize_mysql } = require("../config/Sequelize");
const Sequelize = require('sequelize');
const Personal = require("../model/human/Personal");
const BenefitPlan = require("../model/human/Benefit_Plans");
const defineAssociation = require("../model/association/Association");

const getAveragebenefit = async (req, res) => {
    try {
        // Định nghĩa mối quan hệ giữa hai bảng
        await defineAssociation();

        const result = await BenefitPlan.findAll({
            attributes: [
              [Sequelize.fn('AVG', Sequelize.col('DEDUCTABLE')), 'Average_DEDUCTABLE'],
              [Sequelize.fn('AVG', Sequelize.col('PERCENTAGE_COPAY')), 'Average_PERCENTAGE_COPAY']
            ],
            include: [{
              model: Personal,
              attributes: [],
              where: {
                SHAREHOLDER_STATUS: 0 // Lọc chỉ lấy những người SHAREHOLDER_STATUS là non_SHAREHOLDER
              }
            }],
            raw: true, // Kết quả trả về dưới dạng đối tượng JSON
            
          });
      
          // Lấy ra kết quả trung bình
          const averageDeductable = result[0]['Average_DEDUCTABLE'];
          const averagePercentageCopay = result[0]['Average_PERCENTAGE_COPAY'];
      
          // In kết quả ra terminal
          
        } catch (error) {
          console.error('Lỗi khi tính trung bình:', error);
          throw error; // Ném lỗi để bên ngoài xử lý
        }
      };
      getAveragebenefit();
      
module.exports = getAveragebenefit;
