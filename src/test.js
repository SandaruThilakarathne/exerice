// 'user strict';
// var sql = require('../common/db.js');

// var menuItems = async function (resourceTypeId, permissionTypeId, roleTypeId, partyRoleId) {
//     var parentResourceList = [];
//     var childResourceList = [];
//     var resourceList = await getResourceList(resourceTypeId, permissionTypeId, roleTypeId, partyRoleId);
//     resourceList.map(function (resource) {
//         if (resource.parentResourceId === null) {
//             parentResourceList.push(resource);
//         }
//         else {
//             childResourceList.push(resource);
//         }
//     });
//     parentResourceList.forEach(resource => {
//         resource.childResource = childResourceList.filter(function(cRes)
//         {
//             return cRes.parentResourceId === resource.resourceId;
//         });
//     });
//     return parentResourceList;
// };

// function getResourceList (resourceTypeId, permissionTypeId, roleTypeId, partyRoleId) {
//     return new Promise((resolve, reject) => {
//         var params = [resourceTypeId, permissionTypeId, roleTypeId, partyRoleId];
//         var sp_query = "SET @ResourceTypeID = ?,@PermissionTypeID = ?,@RoleTypeID = ?,@PartyRoleID = ?; CALL usp_GetAllResource (@ResourceTypeID,@PermissionTypeID,@RoleTypeID,@PartyRoleID);";
//         sql.query(sp_query, params, (err, res) => {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 resolve(res[1]);
//             }
//         });
//     });
// }

const pringData = (data) => { 
    console.log(data)
    return "x"
}
    
process.on("close", data => {
    console.log(data)
    // const rsp = pringData(data)
    // process.send(rsp)
    // process.exit();
})
// module.exports = menuItems;