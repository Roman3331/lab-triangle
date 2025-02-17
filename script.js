const triangle = (value, type, value2, type2) => {
  const TYPES = [
    "leg",
    "hypotenuse",
    "adjacent angle",
    "opposite angle",
    "angle",
  ];

  if (!TYPES.includes(type) || !TYPES.includes(type2) || value <= 0 || value2 <= 0) {
    console.log("ще раз перечитайте інструкцію");
    return "failed";
  }

  let a, b, c, alpha, beta;
  const RADIAN = 180 / Math.PI;

  switch (true) {
    case type === "leg" && type2 === "leg":
      a = value;
      b = value2;
      c = Math.sqrt(a ** 2 + b ** 2);
      alpha = Math.atan(a / b) / RADIAN;
      beta = 90 - alpha;
      break;

    case type === "leg" && type2 === "hypotenuse":
    case type === "hypotenuse" && type2 === "leg":
      c = Math.max(value, value2);
      a = Math.min(value, value2);
      b = Math.sqrt(c ** 2 - a ** 2);
      alpha = Math.asin(a / c) / RADIAN;
      beta = 90 - alpha;
      break;

    case type === "leg" && type2 === "adjacent angle":
    case type === "adjacent angle" && type2 === "leg":
      if (type === "leg") {
        a = value;
      } else {
        a = value2;
      }

      if (type === "adjacent angle") {
        beta = value;
      } else {
        beta = value2;
      }

      if (beta <= 0 || beta >= 90) {
        return "failed";
      }
      b = a / Math.tan(beta * RADIAN);
      c = Math.sqrt(a ** 2 + b ** 2);
      alpha = 90 - beta;
      break;

    case type === "leg" && type2 === "opposite angle":
    case type === "opposite angle" && type2 === "leg":
      if (type === "leg") {
        a = value;
      } else {
        a = value2;
      }

      if (type === "opposite angle") {
        alpha = value;
      } else {
        alpha = value2;
      }

      if (alpha <= 0 || alpha >= 90) {
        return "failed";
      }
      b = a / Math.sin(alpha * RADIAN);
      c = Math.sqrt(a ** 2 + b ** 2);
      beta = 90 - alpha;
      break;

    case type === "hypotenuse" && type2 === "angle":
    case type === "angle" && type2 === "hypotenuse":
      if (type === "hypotenuse") {
        c = value;
      } else {
        c = value2;
      }

      if (type === "angle") {
        alpha = value;
      } else {
        alpha = value2;
      }

      if (alpha <= 0 || alpha >= 90) {
        return "failed";
      }
      a = c * Math.sin(alpha * RADIAN);
      b = c * Math.cos(alpha * RADIAN);
      beta = 90 - alpha;
      break;
  }

  console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}, alpha = ${alpha.toFixed(2)}, beta = ${beta.toFixed(2)}`);
  return "success";
};

triangle(4, "leg", 8, "adjacent angle");
