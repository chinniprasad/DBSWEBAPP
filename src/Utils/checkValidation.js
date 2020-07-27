module.exports = function(history) {
    if (sessionStorage.getItem("userData")) {      
      return true;
    } else {
      return false;
    }
  };
  