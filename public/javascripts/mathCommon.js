//common math functions
function correlationCoefficient(X, Y){
    var n = X.length;
    var sigma_x, sigma_y, sigma_xy = 0;
    var sigma_xsq, sigma_ysq = 0;
    for(var i = 0;i < n;i++){
        sigma_x = sigma_x + X[i];
        sigma_y = sigma_y + Y[i];
        sigma_xy = sigma_xy + X[i] * Y[i];
        sigma_xsq = sigma_xsq + X[i] * X[i];
        sigma_ysq = sigma_ysq + Y[i] * Y[i];
    }
    var num =( n * sigma_xy - sigma_x * sigma_y);
    var den = Math.sqrt((n * sigma_xsq -  Math.pow(sigma_x,2)) * (n * sigma_ysq - Math.pow(sigma_y,2))); 
    return num/den;
}
    