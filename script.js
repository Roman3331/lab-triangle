const triangle = (value, type, value2, type2) => {
  const TYPES = [
    "leg",
    "hypotenuse",
    "adjacent angle",
    "opposite angle",
    "angle",
  ];

  if (!TYPES.includes(type) || !TYPES.includes(type2)) {
    console.log("Помилка: некоректний тип параметра");
    return "failed";
  }
  
  if (value <= 0 || value2 <= 0) {
    console.log("Помилка: значення повинні бути більше 0");
    return "failed";
  }

  let a, b, c, alpha, beta;
  const RADIAN = Math.PI / 180;
  const MIN_VALUE = 0.0001;
  const MAX_VALUE = 1e6;

  const isValid = (x) => {
    if (x <= MIN_VALUE) {
      console.log("Помилка: значення занадто мале");
      return false;
    }
    if (x >= MAX_VALUE) {
      console.log("Помилка: значення занадто велике");
      return false;
    }
    return true;
  };

  switch (true) {
    case type === "leg" && type2 === "leg":
      a = value;
      b = value2;
      c = Math.sqrt(a ** 2 + b ** 2);
      if (!isValid(c)) return "failed";
      alpha = Math.atan(a / b) / RADIAN;
      beta = 90 - alpha;
      break;

      case type === "leg" && type2 === "hypotenuse":
        case type === "hypotenuse" && type2 === "leg":
          if ((type === "leg" && value >= value2) || (type === "hypotenuse" && value2 >= value)) {
            console.log("Помилка: катет не може бути більшим або рівним гіпотенузі");
            return "failed";
          }
        
          c = type === "hypotenuse" ? value : value2;
          a = type === "leg" ? value : value2;
        
          b = Math.sqrt(c ** 2 - a ** 2);
          if (!isValid(b)) return "failed";
          alpha = Math.asin(a / c) / RADIAN;
          beta = 90 - alpha;
          break;
        

    case type === "leg" && type2 === "adjacent angle":
    case type === "adjacent angle" && type2 === "leg":
      if (type === "leg") {
        a = value;
        beta = value2;
      } else {
        a = value2;
        beta = value;
      }

      if (beta <= 0 || beta >= 90) {
        console.log("Помилка: кут повинен бути між 0 і 90 градусами");
        return "failed";
      }
      if (!isValid(a)) return "failed";

      b = a * Math.tan(beta * RADIAN);
      c = Math.sqrt(a ** 2 + b ** 2);
      if (!isValid(b) || !isValid(c)) return "failed";
      alpha = 90 - beta;
      break;

    case type === "leg" && type2 === "opposite angle":
    case type === "opposite angle" && type2 === "leg":
      if (type === "leg") {
        a = value;
        alpha = value2;
      } else {
        a = value2;
        alpha = value;
      }

      if (alpha <= 0 || alpha >= 90) {
        console.log("Помилка: кут повинен бути між 0 і 90 градусами");
        return "failed";
      }
      if (!isValid(a)) return "failed";

      c = a / Math.sin(alpha * RADIAN);
      b = Math.sqrt(c ** 2 - a ** 2);
      if (!isValid(b) || !isValid(c)) return "failed";
      beta = 90 - alpha;
      break;

    case type === "hypotenuse" && type2 === "angle":
    case type === "angle" && type2 === "hypotenuse":
      if (type === "hypotenuse") {
        c = value;
        alpha = value2;
      } else {
        c = value2;
        alpha = value;
      }

      if (alpha <= 0 || alpha >= 90) {
        console.log("Помилка: кут повинен бути між 0 і 90 градусами");
        return "failed";
      }
      if (!isValid(c)) return "failed";

      a = c * Math.sin(alpha * RADIAN);
      b = c * Math.cos(alpha * RADIAN);
      if (!isValid(a) || !isValid(b)) return "failed";
      beta = 90 - alpha;
      break;

    default:
      console.log("Помилка: некоректні вхідні параметри");
      return "failed";
  }

  console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}, alpha = ${alpha.toFixed(2)}, beta = ${beta.toFixed(2)}`);
  return "success";
};

triangle(7, "leg", 18, "hypotenuse");
triangle(18, "leg", 7, "hypotenuse");
triangle(0.00001, "leg", 18, "hypotenuse");
triangle(7, "leg", 1e9, "hypotenuse");
triangle(18, "leg", 7, "hypotenuse");
triangle(10, "leg", 10, "hypotenuse");
