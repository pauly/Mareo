(function () {
'use strict';

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

failure.tag = 248;

invalid_argument.tag = 248;

division_by_zero.tag = 248;

assert_failure.tag = 248;


/*  Not a pure module */

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  return result;
}

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    xs[index] = newval;
    return /* () */0;
  }
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return xs[index];
  }
}


/* No side effect */

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var arity = f.length;
    var arity$1 = arity ? arity : 1;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d) {
      if (d < 0) {
        _args = caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity$1));
        continue ;
        
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    } else {
      return f.apply(null, args);
    }
  }
}

function curry_1(o, a0, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[a0]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return o(a0);
      case 2 : 
          return (function (param) {
              return o(a0, param);
            });
      case 3 : 
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 : 
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      
    }
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function curry_2(o, a0, a1, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return app(o(a0), /* array */[a1]);
      case 2 : 
          return o(a0, a1);
      case 3 : 
          return (function (param) {
              return o(a0, a1, param);
            });
      case 4 : 
          return (function (param, param$1) {
              return o(a0, a1, param, param$1);
            });
      case 5 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            });
      
    }
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}


/* No side effect */

function __(tag, block) {
  block.tag = tag;
  return block;
}


/* No side effect */

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    var a_type = typeof a;
    var b_type = typeof b;
    if (a_type === "string") {
      var x = a;
      var y = b;
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    } else {
      var is_a_number = +(a_type === "number");
      var is_b_number = +(b_type === "number");
      if (is_a_number !== 0) {
        if (is_b_number !== 0) {
          return caml_int_compare(a, b);
        } else {
          return -1;
        }
      } else if (is_b_number !== 0) {
        return 1;
      } else if (a_type === "boolean" || a_type === "undefined" || a === null) {
        var x$1 = a;
        var y$1 = b;
        if (x$1 === y$1) {
          return 0;
        } else if (x$1 < y$1) {
          return -1;
        } else {
          return 1;
        }
      } else if (a_type === "function" || b_type === "function") {
        throw [
              invalid_argument,
              "compare: functional value"
            ];
      } else {
        var tag_a = a.tag | 0;
        var tag_b = b.tag | 0;
        if (tag_a === 250) {
          _a = a[0];
          continue ;
          
        } else if (tag_b === 250) {
          _b = b[0];
          continue ;
          
        } else if (tag_a === 248) {
          return caml_int_compare(a[1], b[1]);
        } else if (tag_a === 251) {
          throw [
                invalid_argument,
                "equal: abstract value"
              ];
        } else if (tag_a !== tag_b) {
          if (tag_a < tag_b) {
            return -1;
          } else {
            return 1;
          }
        } else {
          var len_a = a.length;
          var len_b = b.length;
          if (len_a === len_b) {
            var a$1 = a;
            var b$1 = b;
            var _i = 0;
            var same_length = len_a;
            while(true) {
              var i = _i;
              if (i === same_length) {
                return 0;
              } else {
                var res = caml_compare(a$1[i], b$1[i]);
                if (res !== 0) {
                  return res;
                } else {
                  _i = i + 1 | 0;
                  continue ;
                  
                }
              }
            }
          } else if (len_a < len_b) {
            var a$2 = a;
            var b$2 = b;
            var _i$1 = 0;
            var short_length = len_a;
            while(true) {
              var i$1 = _i$1;
              if (i$1 === short_length) {
                return -1;
              } else {
                var res$1 = caml_compare(a$2[i$1], b$2[i$1]);
                if (res$1 !== 0) {
                  return res$1;
                } else {
                  _i$1 = i$1 + 1 | 0;
                  continue ;
                  
                }
              }
            }
          } else {
            var a$3 = a;
            var b$3 = b;
            var _i$2 = 0;
            var short_length$1 = len_b;
            while(true) {
              var i$2 = _i$2;
              if (i$2 === short_length$1) {
                return 1;
              } else {
                var res$2 = caml_compare(a$3[i$2], b$3[i$2]);
                if (res$2 !== 0) {
                  return res$2;
                } else {
                  _i$2 = i$2 + 1 | 0;
                  continue ;
                  
                }
              }
            }
          }
        }
      }
    }
  }
}

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return /* true */1;
    } else {
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return /* false */0;
      } else {
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw [
                invalid_argument,
                "equal: functional value"
              ];
        } else if (b_type === "number" || b_type === "undefined" || b === null) {
          return /* false */0;
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
            
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
            
          } else if (tag_a === 248) {
            return +(a[1] === b[1]);
          } else if (tag_a === 251) {
            throw [
                  invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            return /* false */0;
          } else {
            var len_a = a.length;
            var len_b = b.length;
            if (len_a === len_b) {
              var a$1 = a;
              var b$1 = b;
              var _i = 0;
              var same_length = len_a;
              while(true) {
                var i = _i;
                if (i === same_length) {
                  return /* true */1;
                } else if (caml_equal(a$1[i], b$1[i])) {
                  _i = i + 1 | 0;
                  continue ;
                  
                } else {
                  return /* false */0;
                }
              }
            } else {
              return /* false */0;
            }
          }
        }
      }
    }
  }
}

function caml_notequal(a, b) {
  return 1 - caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return +(caml_compare(a, b) >= 0);
}

function caml_lessequal(a, b) {
  return +(caml_compare(a, b) <= 0);
}


/* No side effect */

var stdout$1 = /* record */[
  /* buffer */"",
  /* output */(function (_, s) {
      var v = s.length - 1 | 0;
      if (( (typeof process !== "undefined") && process.stdout && process.stdout.write)) {
        return ( process.stdout.write )(s);
      } else if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
];

function caml_ml_flush(oc) {
  if (oc[/* buffer */0] !== "") {
    _2(oc[/* output */1], oc, oc[/* buffer */0]);
    oc[/* buffer */0] = "";
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_ml_output(oc, str, offset, len) {
  var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);
  if (( (typeof process !== "undefined") && process.stdout && process.stdout.write ) && oc === stdout$1) {
    return ( process.stdout.write )(str$1);
  } else {
    var id = str$1.lastIndexOf("\n");
    if (id < 0) {
      oc[/* buffer */0] = oc[/* buffer */0] + str$1;
      return /* () */0;
    } else {
      oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(0, id + 1 | 0);
      caml_ml_flush(oc);
      oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(id + 1 | 0);
      return /* () */0;
    }
  }
}

function caml_ml_output_char(oc, $$char) {
  return caml_ml_output(oc, String.fromCharCode($$char), 0, 1);
}


/* stdin Not a pure module */

function caml_sys_random_seed() {
  return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
}


/* No side effect */

function mod_(x, y) {
  if (y === 0) {
    throw division_by_zero;
  } else {
    return x % y;
  }
}

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);


/* imul Not a pure module */

var repeat = ( (String.prototype.repeat && function (count,self){return self.repeat(count)}) ||
                                                  function(count , self) {
        if (self.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (self.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (;;) {
            if ((count & 1) == 1) {
                rpt += self;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            self += self;
        }
        return rpt;
    }
);


/* repeat Not a pure module */

var min_int$1 = /* record */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int$1 = /* record */[
  /* hi */134217727,
  /* lo */1
];

var one = /* record */[
  /* hi */0,
  /* lo */1
];

var zero = /* record */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* record */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return +((x & 2147483648) !== 0);
}

function add(param, param$1) {
  var other_low_ = param$1[/* lo */1];
  var this_low_ = param[/* lo */1];
  var lo = this_low_ + other_low_ & 4294967295;
  var overflow = neg_signed(this_low_) && (neg_signed(other_low_) || !neg_signed(lo)) || neg_signed(other_low_) && !neg_signed(lo) ? 1 : 0;
  var hi = param[/* hi */0] + param$1[/* hi */0] + overflow & 4294967295;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function not(param) {
  var hi = param[/* hi */0] ^ -1;
  var lo = param[/* lo */1] ^ -1;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function eq(x, y) {
  if (x[/* hi */0] === y[/* hi */0]) {
    return +(x[/* lo */1] === y[/* lo */1]);
  } else {
    return /* false */0;
  }
}

function neg(x) {
  if (eq(x, min_int$1)) {
    return min_int$1;
  } else {
    return add(not(x), one);
  }
}

function lsl_(x, numBits) {
  if (numBits) {
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return /* record */[
              /* hi */(lo << (numBits - 32 | 0)),
              /* lo */0
            ];
    } else {
      var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
      return /* record */[
              /* hi */hi,
              /* lo */((lo << numBits) >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function asr_(x, numBits) {
  if (numBits) {
    var hi = x[/* hi */0];
    if (numBits < 32) {
      var hi$1 = (hi >> numBits);
      var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
      return /* record */[
              /* hi */hi$1,
              /* lo */(lo >>> 0)
            ];
    } else {
      var lo$1 = (hi >> (numBits - 32 | 0));
      return /* record */[
              /* hi */hi >= 0 ? 0 : -1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var exit = 0;
    var lo;
    var this_hi = $$this[/* hi */0];
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    if (this_hi !== 0) {
      exit$3 = 4;
    } else if ($$this[/* lo */1] !== 0) {
      exit$3 = 4;
    } else {
      return zero;
    }
    if (exit$3 === 4) {
      if (other[/* hi */0] !== 0) {
        exit$2 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        return zero;
      }
    }
    if (exit$2 === 3) {
      if (this_hi !== -2147483648) {
        exit$1 = 2;
      } else if ($$this[/* lo */1] !== 0) {
        exit$1 = 2;
      } else {
        lo = other[/* lo */1];
        exit = 1;
      }
    }
    if (exit$1 === 2) {
      var other_hi = other[/* hi */0];
      var lo$1 = $$this[/* lo */1];
      var exit$4 = 0;
      if (other_hi !== -2147483648) {
        exit$4 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$4 = 3;
      } else {
        lo = lo$1;
        exit = 1;
      }
      if (exit$4 === 3) {
        var other_lo = other[/* lo */1];
        if (this_hi < 0) {
          if (other_hi < 0) {
            _other = neg(other);
            _this = neg($$this);
            continue ;
            
          } else {
            return neg(mul(neg($$this), other));
          }
        } else if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        } else {
          var a48 = (this_hi >>> 16);
          var a32 = this_hi & 65535;
          var a16 = (lo$1 >>> 16);
          var a00 = lo$1 & 65535;
          var b48 = (other_hi >>> 16);
          var b32 = other_hi & 65535;
          var b16 = (other_lo >>> 16);
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = (c16 >>> 16);
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = (c32 >>> 16);
          c32 = (c32 & 65535) + a16 * b16;
          c48 += (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 += (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          var hi = c32 | (c48 << 16);
          var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
          return /* record */[
                  /* hi */hi,
                  /* lo */(lo$2 >>> 0)
                ];
        }
      }
      
    }
    if (exit === 1) {
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int$1;
      }
    }
    
  }
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return /* true */1;
  } else if (hi < other_hi) {
    return /* false */0;
  } else {
    return +(param[/* lo */1] >= param$1[/* lo */1]);
  }
}

function neq(x, y) {
  return 1 - eq(x, y);
}

function lt(x, y) {
  return 1 - ge(x, y);
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return /* true */1;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return /* false */0;
  } else {
    return +(x[/* lo */1] > y[/* lo */1]);
  }
}

function to_float(param) {
  return param[/* hi */0] * (0x100000000) + param[/* lo */1];
}

var two_ptr_32_dbl = Math.pow(2, 32);

var two_ptr_63_dbl = Math.pow(2, 63);

var neg_two_ptr_63 = -Math.pow(2, 63);

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= neg_two_ptr_63) {
    return min_int$1;
  } else if (x + 1 >= two_ptr_63_dbl) {
    return max_int$1;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    var hi = x / two_ptr_32_dbl | 0;
    var lo = x % two_ptr_32_dbl | 0;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }
}

function div$1(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[/* hi */0];
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0) {
      exit$1 = 2;
    } else if (other[/* lo */1] !== 0) {
      exit$1 = 2;
    } else {
      throw division_by_zero;
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else if (self[/* lo */1] !== 0) {
          exit = 1;
        } else {
          return zero;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 1;
      } else if (eq(other, one) || eq(other, neg_one)) {
        return self;
      } else if (eq(other, min_int$1)) {
        return one;
      } else {
        var other_hi = other[/* hi */0];
        var half_this = asr_(self, 1);
        var approx = lsl_(div$1(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0) {
          exit$2 = 3;
        } else if (approx[/* lo */1] !== 0) {
          exit$2 = 3;
        } else if (other_hi < 0) {
          return one;
        } else {
          return neg(one);
        }
        if (exit$2 === 3) {
          var y = mul(other, approx);
          var rem = add(self, neg(y));
          return add(approx, div$1(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi$1 = other[/* hi */0];
      var exit$3 = 0;
      if (other_hi$1 !== -2147483648) {
        exit$3 = 2;
      } else if (other[/* lo */1] !== 0) {
        exit$3 = 2;
      } else {
        return zero;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi$1 < 0) {
            _other = neg(other);
            _self = neg(self);
            continue ;
            
          } else {
            return neg(div$1(neg(self), other));
          }
        } else if (other_hi$1 < 0) {
          return neg(div$1(self, neg(other)));
        } else {
          var res = zero;
          var rem$1 = self;
          while(ge(rem$1, other)) {
            var approx$1 = Math.max(1, Math.floor(to_float(rem$1) / to_float(other)));
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
              approx$1 -= delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            }
            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add(res, approxRes);
            rem$1 = add(rem$1, neg(approxRem));
          }
          return res;
        }
      }
      
    }
    
  }
}

function div_mod(self, other) {
  var quotient = div$1(self, other);
  var y = mul(quotient, other);
  return /* tuple */[
          quotient,
          add(self, neg(y))
        ];
}

function to_hex(x) {
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  var match = x[/* hi */0];
  var match$1 = x[/* lo */1];
  var exit = 0;
  if (match !== 0) {
    exit = 1;
  } else if (match$1 !== 0) {
    exit = 1;
  } else {
    return "0";
  }
  if (exit === 1) {
    if (match$1 !== 0) {
      if (match !== 0) {
        var lo = aux(x[/* lo */1]);
        var pad = 8 - lo.length | 0;
        if (pad <= 0) {
          return aux(x[/* hi */0]) + lo;
        } else {
          return aux(x[/* hi */0]) + (repeat(pad, "0") + lo);
        }
      } else {
        return aux(x[/* lo */1]);
      }
    } else {
      return aux(x[/* hi */0]) + "00000000";
    }
  }
  
}

function discard_sign(x) {
  return /* record */[
          /* hi */2147483647 & x[/* hi */0],
          /* lo */x[/* lo */1]
        ];
}


/* two_ptr_32_dbl Not a pure module */

function int_of_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw [
          invalid_argument,
          "format_int: format too long"
        ];
  }
  var f = /* record */[
    /* justify */"+",
    /* signstyle */"-",
    /* filter */" ",
    /* alternate : false */0,
    /* base : Dec */2,
    /* signedconv : false */0,
    /* width */0,
    /* uppercase : false */0,
    /* sign */1,
    /* prec */-1,
    /* conv */"f"
  ];
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    } else {
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 : 
                  f[/* base */4] = /* Hex */1;
                  f[/* uppercase */7] = /* true */1;
                  _i = i + 1 | 0;
                  continue ;
                  case 13 : 
              case 14 : 
              case 15 : 
                  exit = 5;
                  break;
              case 12 : 
              case 17 : 
                  exit = 4;
                  break;
              case 23 : 
                  f[/* base */4] = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
                  case 29 : 
                  f[/* base */4] = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
                  case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit = 1;
                  break;
              case 32 : 
                  f[/* base */4] = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
                  
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f[/* signedconv */5] = /* true */1;
          f[/* uppercase */7] = /* true */1;
          f[/* conv */10] = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        var switcher = c - 32 | 0;
        if (switcher > 25 || switcher < 0) {
          exit = 1;
        } else {
          switch (switcher) {
            case 3 : 
                f[/* alternate */3] = /* true */1;
                _i = i + 1 | 0;
                continue ;
                case 0 : 
            case 11 : 
                exit = 2;
                break;
            case 13 : 
                f[/* justify */0] = "-";
                _i = i + 1 | 0;
                continue ;
                case 14 : 
                f[/* prec */9] = 0;
                var j = i + 1 | 0;
                while((function(j){
                    return function () {
                      var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                      return +(w >= 0 && w <= 9);
                    }
                    }(j))()) {
                  f[/* prec */9] = (imul(f[/* prec */9], 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                  j = j + 1 | 0;
                };
                _i = j;
                continue ;
                case 1 : 
            case 2 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 12 : 
            case 15 : 
                exit = 1;
                break;
            case 16 : 
                f[/* filter */2] = "0";
                _i = i + 1 | 0;
                continue ;
                case 17 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 23 : 
            case 24 : 
            case 25 : 
                exit = 3;
                break;
            
          }
        }
      }
      switch (exit) {
        case 1 : 
            _i = i + 1 | 0;
            continue ;
            case 2 : 
            f[/* signstyle */1] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
            case 3 : 
            f[/* width */6] = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return +(w >= 0 && w <= 9);
                }
                }(j$1))()) {
              f[/* width */6] = (imul(f[/* width */6], 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
              j$1 = j$1 + 1 | 0;
            };
            _i = j$1;
            continue ;
            case 4 : 
            f[/* signedconv */5] = /* true */1;
            f[/* base */4] = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
            case 5 : 
            f[/* signedconv */5] = /* true */1;
            f[/* conv */10] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
            
      }
    }
  }
}

function finish_formatting(param, rawbuffer) {
  var justify = param[/* justify */0];
  var signstyle = param[/* signstyle */1];
  var filter = param[/* filter */2];
  var alternate = param[/* alternate */3];
  var base = param[/* base */4];
  var signedconv = param[/* signedconv */5];
  var width = param[/* width */6];
  var uppercase = param[/* uppercase */7];
  var sign = param[/* sign */8];
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base) {
      if (base === /* Hex */1) {
        len = len + 2 | 0;
      }
      
    } else {
      len = len + 1 | 0;
    }
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var i = len ,i_finish = width - 1 | 0; i <= i_finish; ++i){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var i$1 = len ,i_finish$1 = width - 1 | 0; i$1 <= i_finish$1; ++i$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var i$2 = len ,i_finish$2 = width - 1 | 0; i$2 <= i_finish$2; ++i$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  } else {
    var f = parse_format(fmt);
    var f$1 = f;
    var i$1 = i;
    var i$2 = i$1 < 0 ? (
        f$1[/* signedconv */5] ? (f$1[/* sign */8] = -1, -i$1) : (i$1 >>> 0)
      ) : i$1;
    var s = i$2.toString(int_of_base(f$1[/* base */4]));
    if (f$1[/* prec */9] >= 0) {
      f$1[/* filter */2] = " ";
      var n = f$1[/* prec */9] - s.length | 0;
      if (n > 0) {
        s = repeat(n, "0") + s;
      }
      
    }
    return finish_formatting(f$1, s);
  }
}

function caml_int64_format(fmt, x) {
  var f = parse_format(fmt);
  var x$1 = f[/* signedconv */5] && lt(x, /* int64 */[
        /* hi */0,
        /* lo */0
      ]) ? (f[/* sign */8] = -1, neg(x)) : x;
  var s = "";
  var match = f[/* base */4];
  switch (match) {
    case 0 : 
        var wbase = /* int64 */[
          /* hi */0,
          /* lo */8
        ];
        var cvtbl = "01234567";
        if (lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y = discard_sign(x$1);
          var match$1 = div_mod(y, wbase);
          var quotient = add(/* int64 */[
                /* hi */268435456,
                /* lo */0
              ], match$1[0]);
          var modulus = match$1[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          while(neq(quotient, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$2 = div_mod(quotient, wbase);
            quotient = match$2[0];
            modulus = match$2[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          }
        } else {
          var match$3 = div_mod(x$1, wbase);
          var quotient$1 = match$3[0];
          var modulus$1 = match$3[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          while(neq(quotient$1, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$4 = div_mod(quotient$1, wbase);
            quotient$1 = match$4[0];
            modulus$1 = match$4[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          }
        }
        break;
    case 1 : 
        s = to_hex(x$1) + s;
        break;
    case 2 : 
        var wbase$1 = /* int64 */[
          /* hi */0,
          /* lo */10
        ];
        var cvtbl$1 = "0123456789";
        if (lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y$1 = discard_sign(x$1);
          var match$5 = div_mod(y$1, wbase$1);
          var match$6 = div_mod(add(/* int64 */[
                    /* hi */0,
                    /* lo */8
                  ], match$5[1]), wbase$1);
          var quotient$2 = add(add(/* int64 */[
                    /* hi */214748364,
                    /* lo */3435973836
                  ], match$5[0]), match$6[0]);
          var modulus$2 = match$6[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          while(neq(quotient$2, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$7 = div_mod(quotient$2, wbase$1);
            quotient$2 = match$7[0];
            modulus$2 = match$7[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          }
        } else {
          var match$8 = div_mod(x$1, wbase$1);
          var quotient$3 = match$8[0];
          var modulus$3 = match$8[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          while(neq(quotient$3, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$9 = div_mod(quotient$3, wbase$1);
            quotient$3 = match$9[0];
            modulus$3 = match$9[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          }
        }
        break;
    
  }
  if (f[/* prec */9] >= 0) {
    f[/* filter */2] = " ";
    var n = f[/* prec */9] - s.length | 0;
    if (n > 0) {
      s = repeat(n, "0") + s;
    }
    
  }
  return finish_formatting(f, s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f[/* prec */9] < 0 ? 6 : f[/* prec */9];
  var x$1 = x < 0 ? (f[/* sign */8] = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f[/* filter */2] = " ";
  } else if (isFinite(x$1)) {
    var match = f[/* conv */10];
    switch (match) {
      case "e" : 
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" : 
          s = x$1.toFixed(prec);
          break;
      case "g" : 
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            }
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return +(s.length > (prec$1 + 1 | 0));
                    })()) {
                p = p - 1 | 0;
              }
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              }
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f[/* filter */2] = " ";
  }
  return finish_formatting(f, s);
}

var caml_nativeint_format = caml_format_int;

var caml_int32_format = caml_format_int;


/* float_of_string Not a pure module */

function caml_create_string(len) {
  if (len < 0) {
    throw [
          invalid_argument,
          "String.create"
        ];
  } else {
    return new Array(len);
  }
}

function caml_fill_string(s, i, l, c) {
  if (l > 0) {
    for(var k = i ,k_finish = (l + i | 0) - 1 | 0; k <= k_finish; ++k){
      s[k] = c;
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len > 0) {
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return /* () */0;
    } else {
      for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
        s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
      }
      for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
        s2[i2 + i$2 | 0] = /* "\000" */0;
      }
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len > 0) {
    if (s1 === s2) {
      var s1$1 = s1;
      var i1$1 = i1;
      var i2$1 = i2;
      var len$1 = len;
      if (i1$1 < i2$1) {
        var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
        var range_b = len$1 - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
        }
        return /* () */0;
      } else if (i1$1 > i2$1) {
        var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
        var range_b$1 = len$1 - 1 | 0;
        var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
        for(var k = 0; k <= range$1; ++k){
          s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
        }
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1[i1 + i | 0];
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    }
  } else {
    return 0;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

function bytes_to_string(a) {
  var bytes = a;
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === bytes.length) {
    return String.fromCharCode.apply(null,bytes);
  } else {
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null,tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }
    return s;
  }
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}


/* No side effect */

var id = [0];

function get_id() {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = get_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}

function isCamlExceptionOrOpenVariant(e) {
  if (e === undefined) {
    return /* false */0;
  } else if (e.tag === 248) {
    return /* true */1;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return +(slot.tag === 248);
    } else {
      return /* false */0;
    }
  }
}


/* No side effect */

/* not_implemented Not a pure module */

function erase_rel(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */__(0, [erase_rel(param[0])]);
      case 1 : 
          return /* String_ty */__(1, [erase_rel(param[0])]);
      case 2 : 
          return /* Int_ty */__(2, [erase_rel(param[0])]);
      case 3 : 
          return /* Int32_ty */__(3, [erase_rel(param[0])]);
      case 4 : 
          return /* Nativeint_ty */__(4, [erase_rel(param[0])]);
      case 5 : 
          return /* Int64_ty */__(5, [erase_rel(param[0])]);
      case 6 : 
          return /* Float_ty */__(6, [erase_rel(param[0])]);
      case 7 : 
          return /* Bool_ty */__(7, [erase_rel(param[0])]);
      case 8 : 
          return /* Format_arg_ty */__(8, [
                    param[0],
                    erase_rel(param[1])
                  ]);
      case 9 : 
          var ty1 = param[0];
          return /* Format_subst_ty */__(9, [
                    ty1,
                    ty1,
                    erase_rel(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */__(10, [erase_rel(param[0])]);
      case 11 : 
          return /* Theta_ty */__(11, [erase_rel(param[0])]);
      case 12 : 
          return /* Any_ty */__(12, [erase_rel(param[0])]);
      case 13 : 
          return /* Reader_ty */__(13, [erase_rel(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */__(14, [erase_rel(param[0])]);
      
    }
  }
}

function concat_fmtty(fmtty1, fmtty2) {
  if (typeof fmtty1 === "number") {
    return fmtty2;
  } else {
    switch (fmtty1.tag | 0) {
      case 0 : 
          return /* Char_ty */__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 1 : 
          return /* String_ty */__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 2 : 
          return /* Int_ty */__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 3 : 
          return /* Int32_ty */__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 4 : 
          return /* Nativeint_ty */__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 5 : 
          return /* Int64_ty */__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 6 : 
          return /* Float_ty */__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 7 : 
          return /* Bool_ty */__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 8 : 
          return /* Format_arg_ty */__(8, [
                    fmtty1[0],
                    concat_fmtty(fmtty1[1], fmtty2)
                  ]);
      case 9 : 
          return /* Format_subst_ty */__(9, [
                    fmtty1[0],
                    fmtty1[1],
                    concat_fmtty(fmtty1[2], fmtty2)
                  ]);
      case 10 : 
          return /* Alpha_ty */__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 11 : 
          return /* Theta_ty */__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 12 : 
          return /* Any_ty */__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 13 : 
          return /* Reader_ty */__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 14 : 
          return /* Ignored_reader_ty */__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
      
    }
  }
}

function concat_fmt(fmt1, fmt2) {
  if (typeof fmt1 === "number") {
    return fmt2;
  } else {
    switch (fmt1.tag | 0) {
      case 0 : 
          return /* Char */__(0, [concat_fmt(fmt1[0], fmt2)]);
      case 1 : 
          return /* Caml_char */__(1, [concat_fmt(fmt1[0], fmt2)]);
      case 2 : 
          return /* String */__(2, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 3 : 
          return /* Caml_string */__(3, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 4 : 
          return /* Int */__(4, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 5 : 
          return /* Int32 */__(5, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 6 : 
          return /* Nativeint */__(6, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 7 : 
          return /* Int64 */__(7, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 8 : 
          return /* Float */__(8, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 9 : 
          return /* Bool */__(9, [concat_fmt(fmt1[0], fmt2)]);
      case 10 : 
          return /* Flush */__(10, [concat_fmt(fmt1[0], fmt2)]);
      case 11 : 
          return /* String_literal */__(11, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 12 : 
          return /* Char_literal */__(12, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 13 : 
          return /* Format_arg */__(13, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 14 : 
          return /* Format_subst */__(14, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 15 : 
          return /* Alpha */__(15, [concat_fmt(fmt1[0], fmt2)]);
      case 16 : 
          return /* Theta */__(16, [concat_fmt(fmt1[0], fmt2)]);
      case 17 : 
          return /* Formatting_lit */__(17, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 18 : 
          return /* Formatting_gen */__(18, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 19 : 
          return /* Reader */__(19, [concat_fmt(fmt1[0], fmt2)]);
      case 20 : 
          return /* Scan_char_set */__(20, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 21 : 
          return /* Scan_get_counter */__(21, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 22 : 
          return /* Scan_next_char */__(22, [concat_fmt(fmt1[0], fmt2)]);
      case 23 : 
          return /* Ignored_param */__(23, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 24 : 
          return /* Custom */__(24, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      
    }
  }
}


/* No side effect */

function failwith(s) {
  throw [
        failure,
        s
      ];
}

var Exit = create("Pervasives.Exit");

function min(x, y) {
  if (caml_lessequal(x, y)) {
    return x;
  } else {
    return y;
  }
}

function max(x, y) {
  if (caml_greaterequal(x, y)) {
    return x;
  } else {
    return y;
  }
}

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x | 0;
  }
}

var min_int = -2147483648;

function char_of_int(n) {
  if (n < 0 || n > 255) {
    throw [
          invalid_argument,
          "char_of_int"
        ];
  } else {
    return n;
  }
}

function string_of_int(param) {
  return "" + param;
}

function $at(l1, l2) {
  if (l1) {
    return /* :: */[
            l1[0],
            $at(l1[1], l2)
          ];
  } else {
    return l2;
  }
}

var stdout = stdout$1;

function output_string(oc, s) {
  return caml_ml_output(oc, s, 0, s.length);
}


/* No side effect */

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
      
    } else {
      return l2;
    }
  }
}

function map(f, param) {
  if (param) {
    var r = _1(f, param[0]);
    return /* :: */[
            r,
            map(f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      _1(f, param[0]);
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  }
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (l) {
      _l = l[1];
      _accu = _2(f, accu, l[0]);
      continue ;
      
    } else {
      return accu;
    }
  }
}

function find_all(p) {
  return (function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (param$1) {
          var l = param$1[1];
          var x = param$1[0];
          if (_1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
            
          } else {
            _param = l;
            continue ;
            
          }
        } else {
          return rev_append(accu, /* [] */0);
        }
      }
    });
}

var filter = find_all;


/* No side effect */

var Break = create("Sys.Break");


/* No side effect */

function escaped$1(c) {
  var exit = 0;
  if (c >= 40) {
    if (c !== 92) {
      exit = c >= 127 ? 1 : 2;
    } else {
      return "\\\\";
    }
  } else if (c >= 32) {
    if (c >= 39) {
      return "\\'";
    } else {
      exit = 2;
    }
  } else if (c >= 14) {
    exit = 1;
  } else {
    switch (c) {
      case 8 : 
          return "\\b";
      case 9 : 
          return "\\t";
      case 10 : 
          return "\\n";
      case 0 : 
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 11 : 
      case 12 : 
          exit = 1;
          break;
      case 13 : 
          return "\\r";
      
    }
  }
  switch (exit) {
    case 1 : 
        var s = new Array(4);
        s[0] = /* "\\" */92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return bytes_to_string(s);
    case 2 : 
        var s$1 = new Array(1);
        s$1[0] = c;
        return bytes_to_string(s$1);
    
  }
}


/* No side effect */

function make(n, c) {
  var s = caml_create_string(n);
  caml_fill_string(s, 0, n, c);
  return s;
}

function copy(s) {
  var len = s.length;
  var r = caml_create_string(len);
  caml_blit_bytes(s, 0, r, 0, len);
  return r;
}

function sub$2(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          invalid_argument,
          "String.sub / Bytes.sub"
        ];
  } else {
    var r = caml_create_string(len);
    caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }
}

function sub_string(b, ofs, len) {
  return bytes_to_string(sub$2(b, ofs, len));
}

function blit$1(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          invalid_argument,
          "Bytes.blit"
        ];
  } else {
    return caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }
}

function blit_string(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          invalid_argument,
          "String.blit / Bytes.blit_string"
        ];
  } else {
    return caml_blit_string(s1, ofs1, s2, ofs2, len);
  }
}

function escaped(s) {
  var n = 0;
  for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
    var match = s[i];
    var $js;
    if (match >= 32) {
      var switcher = match - 34 | 0;
      $js = switcher > 58 || switcher < 0 ? (
          switcher >= 93 ? 4 : 1
        ) : (
          switcher > 57 || switcher < 1 ? 2 : 1
        );
    } else {
      $js = match >= 11 ? (
          match !== 13 ? 4 : 2
        ) : (
          match >= 8 ? 2 : 4
        );
    }
    n = n + $js | 0;
  }
  if (n === s.length) {
    return copy(s);
  } else {
    var s$prime = caml_create_string(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length - 1 | 0; i$1 <= i_finish$1; ++i$1){
      var c = s[i$1];
      var exit$$1 = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit$$1 = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit$$1 = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit$$1 = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit$$1 = 1;
      } else {
        switch (c) {
          case 8 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "b" */98;
              break;
          case 9 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "t" */116;
              break;
          case 10 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "n" */110;
              break;
          case 0 : 
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 11 : 
          case 12 : 
              exit$$1 = 1;
              break;
          case 13 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "r" */114;
              break;
          
        }
      }
      switch (exit$$1) {
        case 1 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }
}


/* No side effect */

function concat$2(sep, l) {
  if (l) {
    var hd$$1 = l[0];
    var num = [0];
    var len = [0];
    iter((function (s) {
            num[0] = num[0] + 1 | 0;
            len[0] = len[0] + s.length | 0;
            return /* () */0;
          }), l);
    var r = caml_create_string(len[0] + imul(sep.length, num[0] - 1 | 0) | 0);
    caml_blit_string(hd$$1, 0, r, 0, hd$$1.length);
    var pos = [hd$$1.length];
    iter((function (s) {
            caml_blit_string(sep, 0, r, pos[0], sep.length);
            pos[0] = pos[0] + sep.length | 0;
            caml_blit_string(s, 0, r, pos[0], s.length);
            pos[0] = pos[0] + s.length | 0;
            return /* () */0;
          }), l[1]);
    return bytes_to_string(r);
  } else {
    return "";
  }
}

function escaped$2(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return /* false */0;
      } else {
        var match = s.charCodeAt(i);
        if (match >= 32) {
          var switcher = match - 34 | 0;
          if (switcher > 58 || switcher < 0) {
            if (switcher >= 93) {
              return /* true */1;
            } else {
              _i = i + 1 | 0;
              continue ;
              
            }
          } else if (switcher > 57 || switcher < 1) {
            return /* true */1;
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        } else {
          return /* true */1;
        }
      }
    }
  };
  if (needs_escape(0)) {
    return bytes_to_string(escaped(bytes_of_string(s)));
  } else {
    return s;
  }
}

var blit$2 = blit_string;


/* No side effect */

/* No side effect */

var $$Error = create("Js_exn.Error");

function internalToOCamlException(e) {
  if (isCamlExceptionOrOpenVariant(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}


/* No side effect */

function get$1(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s[i];
  }
}


/* No side effect */

function caml_classify_float(x) {
  if (isFinite(x)) {
    if (Math.abs(x) >= 2.2250738585072014e-308) {
      return /* FP_normal */0;
    } else if (x !== 0) {
      return /* FP_subnormal */1;
    } else {
      return /* FP_zero */2;
    }
  } else if (isNaN(x)) {
    return /* FP_nan */4;
  } else {
    return /* FP_infinite */3;
  }
}


/* No side effect */

function add_in_char_set(char_set, c) {
  var str_ind = (c >>> 3);
  var mask = (1 << (c & 7));
  char_set[str_ind] = char_of_int(get$1(char_set, str_ind) | mask);
  return /* () */0;
}

function buffer_check_size(buf, overhead) {
  var len = buf[/* bytes */1].length;
  var min_len = buf[/* ind */0] + overhead | 0;
  if (min_len > len) {
    var new_len = max((len << 1), min_len);
    var new_str = caml_create_string(new_len);
    blit$1(buf[/* bytes */1], 0, new_str, 0, len);
    buf[/* bytes */1] = new_str;
    return /* () */0;
  } else {
    return 0;
  }
}

function buffer_add_char(buf, c) {
  buffer_check_size(buf, 1);
  buf[/* bytes */1][buf[/* ind */0]] = c;
  buf[/* ind */0] = buf[/* ind */0] + 1 | 0;
  return /* () */0;
}

function buffer_add_string(buf, s) {
  var str_len = s.length;
  buffer_check_size(buf, str_len);
  blit$2(s, 0, buf[/* bytes */1], buf[/* ind */0], str_len);
  buf[/* ind */0] = buf[/* ind */0] + str_len | 0;
  return /* () */0;
}

function buffer_contents(buf) {
  return sub_string(buf[/* bytes */1], 0, buf[/* ind */0]);
}

function char_of_fconv(fconv) {
  switch (fconv) {
    case 0 : 
    case 1 : 
    case 2 : 
        return /* "f" */102;
    case 3 : 
    case 4 : 
    case 5 : 
        return /* "e" */101;
    case 6 : 
    case 7 : 
    case 8 : 
        return /* "E" */69;
    case 9 : 
    case 10 : 
    case 11 : 
        return /* "g" */103;
    case 12 : 
    case 13 : 
    case 14 : 
        return /* "G" */71;
    case 15 : 
        return /* "F" */70;
    
  }
}

function bprint_fconv_flag(buf, fconv) {
  switch (fconv) {
    case 1 : 
    case 4 : 
    case 7 : 
    case 10 : 
    case 13 : 
        return buffer_add_char(buf, /* "+" */43);
    case 2 : 
    case 5 : 
    case 8 : 
    case 11 : 
    case 14 : 
        return buffer_add_char(buf, /* " " */32);
    case 0 : 
    case 3 : 
    case 6 : 
    case 9 : 
    case 12 : 
    case 15 : 
        return /* () */0;
    
  }
}

function string_of_formatting_lit(formatting_lit) {
  if (typeof formatting_lit === "number") {
    switch (formatting_lit) {
      case 0 : 
          return "@]";
      case 1 : 
          return "@}";
      case 2 : 
          return "@?";
      case 3 : 
          return "@\n";
      case 4 : 
          return "@.";
      case 5 : 
          return "@@";
      case 6 : 
          return "@%";
      
    }
  } else {
    switch (formatting_lit.tag | 0) {
      case 0 : 
      case 1 : 
          return formatting_lit[0];
      case 2 : 
          return "@" + bytes_to_string(make(1, formatting_lit[0]));
      
    }
  }
}

function bprint_fmtty(buf, _fmtty) {
  while(true) {
    var fmtty = _fmtty;
    if (typeof fmtty === "number") {
      return /* () */0;
    } else {
      switch (fmtty.tag | 0) {
        case 0 : 
            buffer_add_string(buf, "%c");
            _fmtty = fmtty[0];
            continue ;
            case 1 : 
            buffer_add_string(buf, "%s");
            _fmtty = fmtty[0];
            continue ;
            case 2 : 
            buffer_add_string(buf, "%i");
            _fmtty = fmtty[0];
            continue ;
            case 3 : 
            buffer_add_string(buf, "%li");
            _fmtty = fmtty[0];
            continue ;
            case 4 : 
            buffer_add_string(buf, "%ni");
            _fmtty = fmtty[0];
            continue ;
            case 5 : 
            buffer_add_string(buf, "%Li");
            _fmtty = fmtty[0];
            continue ;
            case 6 : 
            buffer_add_string(buf, "%f");
            _fmtty = fmtty[0];
            continue ;
            case 7 : 
            buffer_add_string(buf, "%B");
            _fmtty = fmtty[0];
            continue ;
            case 8 : 
            buffer_add_string(buf, "%{");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%}");
            _fmtty = fmtty[1];
            continue ;
            case 9 : 
            buffer_add_string(buf, "%(");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%)");
            _fmtty = fmtty[2];
            continue ;
            case 10 : 
            buffer_add_string(buf, "%a");
            _fmtty = fmtty[0];
            continue ;
            case 11 : 
            buffer_add_string(buf, "%t");
            _fmtty = fmtty[0];
            continue ;
            case 12 : 
            buffer_add_string(buf, "%?");
            _fmtty = fmtty[0];
            continue ;
            case 13 : 
            buffer_add_string(buf, "%r");
            _fmtty = fmtty[0];
            continue ;
            case 14 : 
            buffer_add_string(buf, "%_r");
            _fmtty = fmtty[0];
            continue ;
            
      }
    }
  }
}

function symm(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */__(0, [symm(param[0])]);
      case 1 : 
          return /* String_ty */__(1, [symm(param[0])]);
      case 2 : 
          return /* Int_ty */__(2, [symm(param[0])]);
      case 3 : 
          return /* Int32_ty */__(3, [symm(param[0])]);
      case 4 : 
          return /* Nativeint_ty */__(4, [symm(param[0])]);
      case 5 : 
          return /* Int64_ty */__(5, [symm(param[0])]);
      case 6 : 
          return /* Float_ty */__(6, [symm(param[0])]);
      case 7 : 
          return /* Bool_ty */__(7, [symm(param[0])]);
      case 8 : 
          return /* Format_arg_ty */__(8, [
                    param[0],
                    symm(param[1])
                  ]);
      case 9 : 
          return /* Format_subst_ty */__(9, [
                    param[1],
                    param[0],
                    symm(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */__(10, [symm(param[0])]);
      case 11 : 
          return /* Theta_ty */__(11, [symm(param[0])]);
      case 12 : 
          return /* Any_ty */__(12, [symm(param[0])]);
      case 13 : 
          return /* Reader_ty */__(13, [symm(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */__(14, [symm(param[0])]);
      
    }
  }
}

function fmtty_rel_det(param) {
  if (typeof param === "number") {
    return /* tuple */[
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              })
          ];
  } else {
    switch (param.tag | 0) {
      case 0 : 
          var match = fmtty_rel_det(param[0]);
          var af = match[1];
          var fa = match[0];
          return /* tuple */[
                  (function () {
                      _1(fa, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match[2],
                  match[3]
                ];
      case 1 : 
          var match$1 = fmtty_rel_det(param[0]);
          var af$1 = match$1[1];
          var fa$1 = match$1[0];
          return /* tuple */[
                  (function () {
                      _1(fa$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$1[2],
                  match$1[3]
                ];
      case 2 : 
          var match$2 = fmtty_rel_det(param[0]);
          var af$2 = match$2[1];
          var fa$2 = match$2[0];
          return /* tuple */[
                  (function () {
                      _1(fa$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$2[2],
                  match$2[3]
                ];
      case 3 : 
          var match$3 = fmtty_rel_det(param[0]);
          var af$3 = match$3[1];
          var fa$3 = match$3[0];
          return /* tuple */[
                  (function () {
                      _1(fa$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$3[2],
                  match$3[3]
                ];
      case 4 : 
          var match$4 = fmtty_rel_det(param[0]);
          var af$4 = match$4[1];
          var fa$4 = match$4[0];
          return /* tuple */[
                  (function () {
                      _1(fa$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$4[2],
                  match$4[3]
                ];
      case 5 : 
          var match$5 = fmtty_rel_det(param[0]);
          var af$5 = match$5[1];
          var fa$5 = match$5[0];
          return /* tuple */[
                  (function () {
                      _1(fa$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$5[2],
                  match$5[3]
                ];
      case 6 : 
          var match$6 = fmtty_rel_det(param[0]);
          var af$6 = match$6[1];
          var fa$6 = match$6[0];
          return /* tuple */[
                  (function () {
                      _1(fa$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$6[2],
                  match$6[3]
                ];
      case 7 : 
          var match$7 = fmtty_rel_det(param[0]);
          var af$7 = match$7[1];
          var fa$7 = match$7[0];
          return /* tuple */[
                  (function () {
                      _1(fa$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$7[2],
                  match$7[3]
                ];
      case 8 : 
          var match$8 = fmtty_rel_det(param[1]);
          var af$8 = match$8[1];
          var fa$8 = match$8[0];
          return /* tuple */[
                  (function () {
                      _1(fa$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$8[2],
                  match$8[3]
                ];
      case 9 : 
          var match$9 = fmtty_rel_det(param[2]);
          var de = match$9[3];
          var ed = match$9[2];
          var af$9 = match$9[1];
          var fa$9 = match$9[0];
          var ty = trans(symm(param[0]), param[1]);
          var match$10 = fmtty_rel_det(ty);
          var jd = match$10[3];
          var dj = match$10[2];
          var ga = match$10[1];
          var ag = match$10[0];
          return /* tuple */[
                  (function () {
                      _1(fa$9, /* Refl */0);
                      _1(ag, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ga, /* Refl */0);
                      _1(af$9, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ed, /* Refl */0);
                      _1(dj, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(jd, /* Refl */0);
                      _1(de, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case 10 : 
          var match$11 = fmtty_rel_det(param[0]);
          var af$10 = match$11[1];
          var fa$10 = match$11[0];
          return /* tuple */[
                  (function () {
                      _1(fa$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$11[2],
                  match$11[3]
                ];
      case 11 : 
          var match$12 = fmtty_rel_det(param[0]);
          var af$11 = match$12[1];
          var fa$11 = match$12[0];
          return /* tuple */[
                  (function () {
                      _1(fa$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$12[2],
                  match$12[3]
                ];
      case 12 : 
          var match$13 = fmtty_rel_det(param[0]);
          var af$12 = match$13[1];
          var fa$12 = match$13[0];
          return /* tuple */[
                  (function () {
                      _1(fa$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$13[2],
                  match$13[3]
                ];
      case 13 : 
          var match$14 = fmtty_rel_det(param[0]);
          var de$1 = match$14[3];
          var ed$1 = match$14[2];
          var af$13 = match$14[1];
          var fa$13 = match$14[0];
          return /* tuple */[
                  (function () {
                      _1(fa$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ed$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(de$1, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case 14 : 
          var match$15 = fmtty_rel_det(param[0]);
          var de$2 = match$15[3];
          var ed$2 = match$15[2];
          var af$14 = match$15[1];
          var fa$14 = match$15[0];
          return /* tuple */[
                  (function () {
                      _1(fa$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ed$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(de$2, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      
    }
  }
}

function trans(ty1, ty2) {
  var exit$$1 = 0;
  if (typeof ty1 === "number") {
    if (typeof ty2 === "number") {
      if (ty2) {
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                816,
                23
              ]
            ];
      } else {
        return /* End_of_fmtty */0;
      }
    } else {
      switch (ty2.tag | 0) {
        case 8 : 
            exit$$1 = 6;
            break;
        case 9 : 
            exit$$1 = 7;
            break;
        case 10 : 
            exit$$1 = 1;
            break;
        case 11 : 
            exit$$1 = 2;
            break;
        case 12 : 
            exit$$1 = 3;
            break;
        case 13 : 
            exit$$1 = 4;
            break;
        case 14 : 
            exit$$1 = 5;
            break;
        default:
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  816,
                  23
                ]
              ];
      }
    }
  } else {
    switch (ty1.tag | 0) {
      case 0 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 0 : 
                  return /* Char_ty */__(0, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 1 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 1 : 
                  return /* String_ty */__(1, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 2 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 2 : 
                  return /* Int_ty */__(2, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 3 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 3 : 
                  return /* Int32_ty */__(3, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 4 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 4 : 
                  return /* Nativeint_ty */__(4, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 5 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 5 : 
                  return /* Int64_ty */__(5, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 6 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 6 : 
                  return /* Float_ty */__(6, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 7 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 7 : 
                  return /* Bool_ty */__(7, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 8 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    802,
                    26
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 8 : 
                  return /* Format_arg_ty */__(8, [
                            trans(ty1[0], ty2[0]),
                            trans(ty1[1], ty2[1])
                          ]);
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        802,
                        26
                      ]
                    ];
            }
          }
          break;
      case 9 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    812,
                    28
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  var ty = trans(symm(ty1[1]), ty2[0]);
                  var match = fmtty_rel_det(ty);
                  _1(match[1], /* Refl */0);
                  _1(match[3], /* Refl */0);
                  return /* Format_subst_ty */__(9, [
                            ty1[0],
                            ty2[1],
                            trans(ty1[2], ty2[2])
                          ]);
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        812,
                        28
                      ]
                    ];
            }
          }
          break;
      case 10 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    780,
                    21
                  ]
                ];
          } else if (ty2.tag === 10) {
            return /* Alpha_ty */__(10, [trans(ty1[0], ty2[0])]);
          } else {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    780,
                    21
                  ]
                ];
          }
          break;
      case 11 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    784,
                    21
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  return /* Theta_ty */__(11, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        784,
                        21
                      ]
                    ];
            }
          }
          break;
      case 12 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    788,
                    19
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  return /* Any_ty */__(12, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        788,
                        19
                      ]
                    ];
            }
          }
          break;
      case 13 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    792,
                    22
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  return /* Reader_ty */__(13, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        792,
                        22
                      ]
                    ];
            }
          }
          break;
      case 14 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    797,
                    30
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  return /* Ignored_reader_ty */__(14, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        797,
                        30
                      ]
                    ];
            }
          }
          break;
      
    }
  }
  switch (exit$$1) {
    case 1 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                781,
                21
              ]
            ];
    case 2 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                785,
                21
              ]
            ];
    case 3 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                789,
                19
              ]
            ];
    case 4 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                793,
                22
              ]
            ];
    case 5 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                798,
                30
              ]
            ];
    case 6 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                803,
                26
              ]
            ];
    case 7 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                813,
                28
              ]
            ];
    case 8 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                817,
                23
              ]
            ];
    
  }
}

var Type_mismatch = create("CamlinternalFormat.Type_mismatch");

function type_padding(pad, fmtty) {
  if (typeof pad === "number") {
    return /* Padding_fmtty_EBB */[
            /* No_padding */0,
            fmtty
          ];
  } else if (pad.tag) {
    if (typeof fmtty === "number") {
      throw Type_mismatch;
    } else if (fmtty.tag === 2) {
      return /* Padding_fmtty_EBB */[
              /* Arg_padding */__(1, [pad[0]]),
              fmtty[0]
            ];
    } else {
      throw Type_mismatch;
    }
  } else {
    return /* Padding_fmtty_EBB */[
            /* Lit_padding */__(0, [
                pad[0],
                pad[1]
              ]),
            fmtty
          ];
  }
}

function type_padprec(pad, prec, fmtty) {
  var match = type_padding(pad, fmtty);
  if (typeof prec === "number") {
    if (prec !== 0) {
      var match$1 = match[1];
      if (typeof match$1 === "number") {
        throw Type_mismatch;
      } else if (match$1.tag === 2) {
        return /* Padprec_fmtty_EBB */[
                match[0],
                /* Arg_precision */1,
                match$1[0]
              ];
      } else {
        throw Type_mismatch;
      }
    } else {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* No_precision */0,
              match[1]
            ];
    }
  } else {
    return /* Padprec_fmtty_EBB */[
            match[0],
            /* Lit_precision */[prec[0]],
            match[1]
          ];
  }
}

function type_ignored_param_one(ign, fmt, fmtty) {
  var match = type_format_gen(fmt, fmtty);
  return /* Fmt_fmtty_EBB */[
          /* Ignored_param */__(23, [
              ign,
              match[0]
            ]),
          match[1]
        ];
}

function type_format_gen(fmt, fmtty) {
  if (typeof fmt === "number") {
    return /* Fmt_fmtty_EBB */[
            /* End_of_format */0,
            fmtty
          ];
  } else {
    switch (fmt.tag | 0) {
      case 0 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Char */__(0, [match[0]]),
                    match[1]
                  ];
          }
          break;
      case 1 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match$1 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_char */__(1, [match$1[0]]),
                    match$1[1]
                  ];
          }
          break;
      case 2 : 
          var match$2 = type_padding(fmt[0], fmtty);
          var match$3 = match$2[1];
          if (typeof match$3 === "number") {
            throw Type_mismatch;
          } else if (match$3.tag === 1) {
            var match$4 = type_format_gen(fmt[1], match$3[0]);
            return /* Fmt_fmtty_EBB */[
                    /* String */__(2, [
                        match$2[0],
                        match$4[0]
                      ]),
                    match$4[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 3 : 
          var match$5 = type_padding(fmt[0], fmtty);
          var match$6 = match$5[1];
          if (typeof match$6 === "number") {
            throw Type_mismatch;
          } else if (match$6.tag === 1) {
            var match$7 = type_format_gen(fmt[1], match$6[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_string */__(3, [
                        match$5[0],
                        match$7[0]
                      ]),
                    match$7[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 4 : 
          var match$8 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$9 = match$8[2];
          if (typeof match$9 === "number") {
            throw Type_mismatch;
          } else if (match$9.tag === 2) {
            var match$10 = type_format_gen(fmt[3], match$9[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int */__(4, [
                        fmt[0],
                        match$8[0],
                        match$8[1],
                        match$10[0]
                      ]),
                    match$10[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 5 : 
          var match$11 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$12 = match$11[2];
          if (typeof match$12 === "number") {
            throw Type_mismatch;
          } else if (match$12.tag === 3) {
            var match$13 = type_format_gen(fmt[3], match$12[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int32 */__(5, [
                        fmt[0],
                        match$11[0],
                        match$11[1],
                        match$13[0]
                      ]),
                    match$13[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 6 : 
          var match$14 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$15 = match$14[2];
          if (typeof match$15 === "number") {
            throw Type_mismatch;
          } else if (match$15.tag === 4) {
            var match$16 = type_format_gen(fmt[3], match$15[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Nativeint */__(6, [
                        fmt[0],
                        match$14[0],
                        match$14[1],
                        match$16[0]
                      ]),
                    match$16[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 7 : 
          var match$17 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$18 = match$17[2];
          if (typeof match$18 === "number") {
            throw Type_mismatch;
          } else if (match$18.tag === 5) {
            var match$19 = type_format_gen(fmt[3], match$18[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int64 */__(7, [
                        fmt[0],
                        match$17[0],
                        match$17[1],
                        match$19[0]
                      ]),
                    match$19[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 8 : 
          var match$20 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$21 = match$20[2];
          if (typeof match$21 === "number") {
            throw Type_mismatch;
          } else if (match$21.tag === 6) {
            var match$22 = type_format_gen(fmt[3], match$21[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Float */__(8, [
                        fmt[0],
                        match$20[0],
                        match$20[1],
                        match$22[0]
                      ]),
                    match$22[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 9 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 7) {
            var match$23 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Bool */__(9, [match$23[0]]),
                    match$23[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 10 : 
          var match$24 = type_format_gen(fmt[0], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Flush */__(10, [match$24[0]]),
                  match$24[1]
                ];
      case 11 : 
          var match$25 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* String_literal */__(11, [
                      fmt[0],
                      match$25[0]
                    ]),
                  match$25[1]
                ];
      case 12 : 
          var match$26 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Char_literal */__(12, [
                      fmt[0],
                      match$26[0]
                    ]),
                  match$26[1]
                ];
      case 13 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 8) {
            var sub_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[fmt[1]], /* Fmtty_EBB */[sub_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$27 = type_format_gen(fmt[2], fmtty[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Format_arg */__(13, [
                        fmt[0],
                        sub_fmtty$prime,
                        match$27[0]
                      ]),
                    match$27[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 14 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 9) {
            var sub_fmtty1 = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(fmt[1])], /* Fmtty_EBB */[erase_rel(sub_fmtty1)])) {
              throw Type_mismatch;
            }
            var match$28 = type_format_gen(fmt[2], erase_rel(fmtty[2]));
            return /* Fmt_fmtty_EBB */[
                    /* Format_subst */__(14, [
                        fmt[0],
                        sub_fmtty1,
                        match$28[0]
                      ]),
                    match$28[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 15 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 10) {
            var match$29 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Alpha */__(15, [match$29[0]]),
                    match$29[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 16 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 11) {
            var match$30 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Theta */__(16, [match$30[0]]),
                    match$30[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 17 : 
          var match$31 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Formatting_lit */__(17, [
                      fmt[0],
                      match$31[0]
                    ]),
                  match$31[1]
                ];
      case 18 : 
          var formatting_gen = fmt[0];
          var fmt0 = fmt[1];
          var fmtty0 = fmtty;
          if (formatting_gen.tag) {
            var match$32 = formatting_gen[0];
            var match$33 = type_format_gen(match$32[0], fmtty0);
            var match$34 = type_format_gen(fmt0, match$33[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */__(18, [
                        /* Open_box */__(1, [/* Format */[
                              match$33[0],
                              match$32[1]
                            ]]),
                        match$34[0]
                      ]),
                    match$34[1]
                  ];
          } else {
            var match$35 = formatting_gen[0];
            var match$36 = type_format_gen(match$35[0], fmtty0);
            var match$37 = type_format_gen(fmt0, match$36[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */__(18, [
                        /* Open_tag */__(0, [/* Format */[
                              match$36[0],
                              match$35[1]
                            ]]),
                        match$37[0]
                      ]),
                    match$37[1]
                  ];
          }
      case 19 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 13) {
            var match$38 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Reader */__(19, [match$38[0]]),
                    match$38[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 20 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 1) {
            var match$39 = type_format_gen(fmt[2], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_char_set */__(20, [
                        fmt[0],
                        fmt[1],
                        match$39[0]
                      ]),
                    match$39[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 21 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 2) {
            var match$40 = type_format_gen(fmt[1], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_get_counter */__(21, [
                        fmt[0],
                        match$40[0]
                      ]),
                    match$40[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 23 : 
          var ign = fmt[0];
          var fmt$1 = fmt[1];
          var fmtty$1 = fmtty;
          if (typeof ign === "number") {
            if (ign === 3) {
              if (typeof fmtty$1 === "number") {
                throw Type_mismatch;
              } else if (fmtty$1.tag === 14) {
                var match$41 = type_format_gen(fmt$1, fmtty$1[0]);
                return /* Fmt_fmtty_EBB */[
                        /* Ignored_param */__(23, [
                            /* Ignored_reader */3,
                            match$41[0]
                          ]),
                        match$41[1]
                      ];
              } else {
                throw Type_mismatch;
              }
            } else {
              return type_ignored_param_one(ign, fmt$1, fmtty$1);
            }
          } else {
            switch (ign.tag | 0) {
              case 7 : 
                  return type_ignored_param_one(/* Ignored_format_arg */__(7, [
                                ign[0],
                                ign[1]
                              ]), fmt$1, fmtty$1);
              case 8 : 
                  var match$42 = type_ignored_format_substitution(ign[1], fmt$1, fmtty$1);
                  var match$43 = match$42[1];
                  return /* Fmt_fmtty_EBB */[
                          /* Ignored_param */__(23, [
                              /* Ignored_format_subst */__(8, [
                                  ign[0],
                                  match$42[0]
                                ]),
                              match$43[0]
                            ]),
                          match$43[1]
                        ];
              default:
                return type_ignored_param_one(ign, fmt$1, fmtty$1);
            }
          }
      case 22 : 
      case 24 : 
          throw Type_mismatch;
      
    }
  }
}

function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
  if (typeof sub_fmtty === "number") {
    return /* Fmtty_fmt_EBB */[
            /* End_of_fmtty */0,
            type_format_gen(fmt, fmtty)
          ];
  } else {
    switch (sub_fmtty.tag | 0) {
      case 0 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Char_ty */__(0, [match[0]]),
                    match[1]
                  ];
          }
          break;
      case 1 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 1) {
            var match$1 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* String_ty */__(1, [match$1[0]]),
                    match$1[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 2 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 2) {
            var match$2 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int_ty */__(2, [match$2[0]]),
                    match$2[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 3 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 3) {
            var match$3 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int32_ty */__(3, [match$3[0]]),
                    match$3[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 4 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 4) {
            var match$4 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Nativeint_ty */__(4, [match$4[0]]),
                    match$4[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 5 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 5) {
            var match$5 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int64_ty */__(5, [match$5[0]]),
                    match$5[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 6 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 6) {
            var match$6 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Float_ty */__(6, [match$6[0]]),
                    match$6[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 7 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 7) {
            var match$7 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Bool_ty */__(7, [match$7[0]]),
                    match$7[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 8 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 8) {
            var sub2_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[sub_fmtty[0]], /* Fmtty_EBB */[sub2_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$8 = type_ignored_format_substitution(sub_fmtty[1], fmt, fmtty[1]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_arg_ty */__(8, [
                        sub2_fmtty$prime,
                        match$8[0]
                      ]),
                    match$8[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 9 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 9) {
            var sub2_fmtty$prime$1 = fmtty[1];
            var sub1_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[0])], /* Fmtty_EBB */[erase_rel(sub1_fmtty$prime)])) {
              throw Type_mismatch;
            }
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[1])], /* Fmtty_EBB */[erase_rel(sub2_fmtty$prime$1)])) {
              throw Type_mismatch;
            }
            var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
            var match$9 = fmtty_rel_det(sub_fmtty$prime);
            _1(match$9[1], /* Refl */0);
            _1(match$9[3], /* Refl */0);
            var match$10 = type_ignored_format_substitution(erase_rel(sub_fmtty[2]), fmt, fmtty[2]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_subst_ty */__(9, [
                        sub1_fmtty$prime,
                        sub2_fmtty$prime$1,
                        symm(match$10[0])
                      ]),
                    match$10[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 10 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 10) {
            var match$11 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Alpha_ty */__(10, [match$11[0]]),
                    match$11[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 11 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 11) {
            var match$12 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Theta_ty */__(11, [match$12[0]]),
                    match$12[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 12 : 
          throw Type_mismatch;
      case 13 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 13) {
            var match$13 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Reader_ty */__(13, [match$13[0]]),
                    match$13[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 14 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 14) {
            var match$14 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Ignored_reader_ty */__(14, [match$14[0]]),
                    match$14[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      
    }
  }
}

function type_format(fmt, fmtty) {
  var match = type_format_gen(fmt, fmtty);
  if (typeof match[1] === "number") {
    return match[0];
  } else {
    throw Type_mismatch;
  }
}

function recast(fmt, fmtty) {
  return type_format(fmt, erase_rel(symm(fmtty)));
}

function fix_padding(padty, width, str) {
  var len = str.length;
  var match_000 = abs(width);
  var match_001 = width < 0 ? /* Left */0 : padty;
  var width$1 = match_000;
  if (width$1 <= len) {
    return str;
  } else {
    var padty$1 = match_001;
    var res = make(width$1, padty$1 === /* Zeros */2 ? /* "0" */48 : /* " " */32);
    switch (padty$1) {
      case 0 : 
          blit$2(str, 0, res, 0, len);
          break;
      case 1 : 
          blit$2(str, 0, res, width$1 - len | 0, len);
          break;
      case 2 : 
          if (len > 0 && (get(str, 0) === /* "+" */43 || get(str, 0) === /* "-" */45 || get(str, 0) === /* " " */32)) {
            res[0] = get(str, 0);
            blit$2(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
          } else if (len > 1 && get(str, 0) === /* "0" */48 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
            res[1] = get(str, 1);
            blit$2(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
          } else {
            blit$2(str, 0, res, width$1 - len | 0, len);
          }
          break;
      
    }
    return bytes_to_string(res);
  }
}

function fix_int_precision(prec, str) {
  var prec$1 = abs(prec);
  var len = str.length;
  var c = get(str, 0);
  var exit$$1 = 0;
  if (c >= 58) {
    if (c >= 71) {
      if (c > 102 || c < 97) {
        return str;
      } else {
        exit$$1 = 2;
      }
    } else if (c >= 65) {
      exit$$1 = 2;
    } else {
      return str;
    }
  } else if (c !== 32) {
    if (c >= 43) {
      switch (c - 43 | 0) {
        case 0 : 
        case 2 : 
            exit$$1 = 1;
            break;
        case 1 : 
        case 3 : 
        case 4 : 
            return str;
        case 5 : 
            if ((prec$1 + 2 | 0) > len && len > 1 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
              var res = make(prec$1 + 2 | 0, /* "0" */48);
              res[1] = get(str, 1);
              blit$2(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
              return bytes_to_string(res);
            } else {
              exit$$1 = 2;
            }
            break;
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 10 : 
        case 11 : 
        case 12 : 
        case 13 : 
        case 14 : 
            exit$$1 = 2;
            break;
        
      }
    } else {
      return str;
    }
  } else {
    exit$$1 = 1;
  }
  switch (exit$$1) {
    case 1 : 
        if ((prec$1 + 1 | 0) > len) {
          var res$1 = make(prec$1 + 1 | 0, /* "0" */48);
          res$1[0] = c;
          blit$2(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
          return bytes_to_string(res$1);
        } else {
          return str;
        }
        break;
    case 2 : 
        if (prec$1 > len) {
          var res$2 = make(prec$1, /* "0" */48);
          blit$2(str, 0, res$2, prec$1 - len | 0, len);
          return bytes_to_string(res$2);
        } else {
          return str;
        }
        break;
    
  }
}

function string_to_caml_string(str) {
  return concat$2(escaped$2(str), /* :: */[
              "\"",
              /* :: */[
                "\"",
                /* [] */0
              ]
            ]);
}

function format_of_iconv(iconv) {
  switch (iconv) {
    case 0 : 
        return "%d";
    case 1 : 
        return "%+d";
    case 2 : 
        return "% d";
    case 3 : 
        return "%i";
    case 4 : 
        return "%+i";
    case 5 : 
        return "% i";
    case 6 : 
        return "%x";
    case 7 : 
        return "%#x";
    case 8 : 
        return "%X";
    case 9 : 
        return "%#X";
    case 10 : 
        return "%o";
    case 11 : 
        return "%#o";
    case 12 : 
        return "%u";
    
  }
}

function format_of_aconv(iconv, c) {
  var seps;
  switch (iconv) {
    case 0 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 1 : 
        seps = /* :: */[
          "%+",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 2 : 
        seps = /* :: */[
          "% ",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 3 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 4 : 
        seps = /* :: */[
          "%+",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 5 : 
        seps = /* :: */[
          "% ",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 6 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "x",
            /* [] */0
          ]
        ];
        break;
    case 7 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "x",
            /* [] */0
          ]
        ];
        break;
    case 8 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "X",
            /* [] */0
          ]
        ];
        break;
    case 9 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "X",
            /* [] */0
          ]
        ];
        break;
    case 10 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "o",
            /* [] */0
          ]
        ];
        break;
    case 11 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "o",
            /* [] */0
          ]
        ];
        break;
    case 12 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "u",
            /* [] */0
          ]
        ];
        break;
    
  }
  return concat$2(bytes_to_string(make(1, c)), seps);
}

function format_of_fconv(fconv, prec) {
  if (fconv === /* Float_F */15) {
    return "%.12g";
  } else {
    var prec$1 = abs(prec);
    var symb = char_of_fconv(fconv);
    var buf = /* record */[
      /* ind */0,
      /* bytes */new Array(16)
    ];
    buffer_add_char(buf, /* "%" */37);
    bprint_fconv_flag(buf, fconv);
    buffer_add_char(buf, /* "." */46);
    buffer_add_string(buf, "" + prec$1);
    buffer_add_char(buf, symb);
    return buffer_contents(buf);
  }
}

function convert_int(iconv, n) {
  return caml_format_int(format_of_iconv(iconv), n);
}

function convert_int32(iconv, n) {
  return caml_int32_format(format_of_aconv(iconv, /* "l" */108), n);
}

function convert_nativeint(iconv, n) {
  return caml_nativeint_format(format_of_aconv(iconv, /* "n" */110), n);
}

function convert_int64(iconv, n) {
  return caml_int64_format(format_of_aconv(iconv, /* "L" */76), n);
}

function convert_float(fconv, prec, x) {
  var prec$1 = abs(prec);
  var str = caml_format_float(format_of_fconv(fconv, prec$1), x);
  if (fconv !== /* Float_F */15) {
    return str;
  } else {
    var len = str.length;
    var is_valid = function (_i) {
      while(true) {
        var i = _i;
        if (i === len) {
          return /* false */0;
        } else {
          var match = get(str, i);
          var switcher = match - 46 | 0;
          if (switcher > 23 || switcher < 0) {
            if (switcher !== 55) {
              _i = i + 1 | 0;
              continue ;
              
            } else {
              return /* true */1;
            }
          } else if (switcher > 22 || switcher < 1) {
            return /* true */1;
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        }
      }
    };
    var match = caml_classify_float(x);
    if (match !== 3) {
      if (match >= 4) {
        return "nan";
      } else if (is_valid(0)) {
        return str;
      } else {
        return str + ".";
      }
    } else if (x < 0.0) {
      return "neg_infinity";
    } else {
      return "infinity";
    }
  }
}

function format_caml_char(c) {
  return concat$2(escaped$1(c), /* :: */[
              "'",
              /* :: */[
                "'",
                /* [] */0
              ]
            ]);
}

function string_of_fmtty(fmtty) {
  var buf = /* record */[
    /* ind */0,
    /* bytes */new Array(16)
  ];
  bprint_fmtty(buf, fmtty);
  return buffer_contents(buf);
}

function make_printf(_k, o, _acc, _fmt) {
  while(true) {
    var fmt = _fmt;
    var acc = _acc;
    var k = _k;
    if (typeof fmt === "number") {
      return _2(k, o, acc);
    } else {
      switch (fmt.tag | 0) {
        case 0 : 
            var rest = fmt[0];
            return (function(k,acc,rest){
            return function (c) {
              var new_acc = /* Acc_data_char */__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest);
            }
            }(k,acc,rest));
        case 1 : 
            var rest$1 = fmt[0];
            return (function(k,acc,rest$1){
            return function (c) {
              var new_acc_001 = format_caml_char(c);
              var new_acc = /* Acc_data_string */__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$1);
            }
            }(k,acc,rest$1));
        case 2 : 
            return make_string_padding(k, o, acc, fmt[1], fmt[0], (function (str) {
                          return str;
                        }));
        case 3 : 
            return make_string_padding(k, o, acc, fmt[1], fmt[0], string_to_caml_string);
        case 4 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int, fmt[0]);
        case 5 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int32, fmt[0]);
        case 6 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_nativeint, fmt[0]);
        case 7 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int64, fmt[0]);
        case 8 : 
            var k$1 = k;
            var o$1 = o;
            var acc$1 = acc;
            var fmt$1 = fmt[3];
            var pad = fmt[1];
            var prec = fmt[2];
            var fconv = fmt[0];
            if (typeof pad === "number") {
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv){
                  return function (p, x) {
                    var str = convert_float(fconv, p, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv){
                  return function (x) {
                    var str = convert_float(fconv, 6, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv));
                }
              } else {
                var p = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,p){
                return function (x) {
                  var str = convert_float(fconv, p, x);
                  return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,p));
              }
            } else if (pad.tag) {
              var padty = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                  return function (w, p, x) {
                    var str = fix_padding(padty, w, convert_float(fconv, p, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                  return function (w, x) {
                    var str = convert_float(fconv, 6, x);
                    var str$prime = fix_padding(padty, w, str);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                }
              } else {
                var p$1 = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1){
                return function (w, x) {
                  var str = fix_padding(padty, w, convert_float(fconv, p$1, x));
                  return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1));
              }
            } else {
              var w = pad[1];
              var padty$1 = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                  return function (p, x) {
                    var str = fix_padding(padty$1, w, convert_float(fconv, p, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                  return function (x) {
                    var str = convert_float(fconv, 6, x);
                    var str$prime = fix_padding(padty$1, w, str);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                }
              } else {
                var p$2 = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2){
                return function (x) {
                  var str = fix_padding(padty$1, w, convert_float(fconv, p$2, x));
                  return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2));
              }
            }
        case 9 : 
            var rest$2 = fmt[0];
            return (function(k,acc,rest$2){
            return function (b) {
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            b ? "true" : "false"
                          ]), rest$2);
            }
            }(k,acc,rest$2));
        case 10 : 
            _fmt = fmt[0];
            _acc = /* Acc_flush */__(7, [acc]);
            continue ;
            case 11 : 
            _fmt = fmt[1];
            _acc = /* Acc_string_literal */__(2, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 12 : 
            _fmt = fmt[1];
            _acc = /* Acc_char_literal */__(3, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 13 : 
            var rest$3 = fmt[2];
            var ty = string_of_fmtty(fmt[1]);
            return (function(k,acc,rest$3,ty){
            return function () {
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            ty
                          ]), rest$3);
            }
            }(k,acc,rest$3,ty));
        case 14 : 
            var rest$4 = fmt[2];
            var fmtty = fmt[1];
            return (function(k,acc,fmtty,rest$4){
            return function (param) {
              return make_printf(k, o, acc, concat_fmt(recast(param[0], fmtty), rest$4));
            }
            }(k,acc,fmtty,rest$4));
        case 15 : 
            var rest$5 = fmt[0];
            return (function(k,acc,rest$5){
            return function (f, x) {
              return make_printf(k, o, /* Acc_delay */__(6, [
                            acc,
                            (function (o) {
                                return _2(f, o, x);
                              })
                          ]), rest$5);
            }
            }(k,acc,rest$5));
        case 16 : 
            var rest$6 = fmt[0];
            return (function(k,acc,rest$6){
            return function (f) {
              return make_printf(k, o, /* Acc_delay */__(6, [
                            acc,
                            f
                          ]), rest$6);
            }
            }(k,acc,rest$6));
        case 17 : 
            _fmt = fmt[1];
            _acc = /* Acc_formatting_lit */__(0, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 18 : 
            var match = fmt[0];
            if (match.tag) {
              var rest$7 = fmt[1];
              var k$prime = (function(k,acc,rest$7){
              return function k$prime(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                              acc,
                              /* Acc_open_box */__(1, [kacc])
                            ]), rest$7);
              }
              }(k,acc,rest$7));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime;
              continue ;
              
            } else {
              var rest$8 = fmt[1];
              var k$prime$1 = (function(k,acc,rest$8){
              return function k$prime$1(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                              acc,
                              /* Acc_open_tag */__(0, [kacc])
                            ]), rest$8);
              }
              }(k,acc,rest$8));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime$1;
              continue ;
              
            }
            break;
        case 19 : 
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    1449,
                    4
                  ]
                ];
        case 20 : 
            var rest$9 = fmt[2];
            var new_acc = /* Acc_invalid_arg */__(8, [
                acc,
                "Printf: bad conversion %["
              ]);
            return (function(k,rest$9,new_acc){
            return function () {
              return make_printf(k, o, new_acc, rest$9);
            }
            }(k,rest$9,new_acc));
        case 21 : 
            var rest$10 = fmt[1];
            return (function(k,acc,rest$10){
            return function (n) {
              var new_acc_001 = caml_format_int("%u", n);
              var new_acc = /* Acc_data_string */__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$10);
            }
            }(k,acc,rest$10));
        case 22 : 
            var rest$11 = fmt[0];
            return (function(k,acc,rest$11){
            return function (c) {
              var new_acc = /* Acc_data_char */__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest$11);
            }
            }(k,acc,rest$11));
        case 23 : 
            var k$2 = k;
            var o$2 = o;
            var acc$2 = acc;
            var ign = fmt[0];
            var fmt$2 = fmt[1];
            if (typeof ign === "number") {
              if (ign === 3) {
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        1517,
                        39
                      ]
                    ];
              } else {
                return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
              }
            } else if (ign.tag === 8) {
              return make_from_fmtty(k$2, o$2, acc$2, ign[1], fmt$2);
            } else {
              return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
            }
        case 24 : 
            return make_custom(k, o, acc, fmt[2], fmt[0], _1(fmt[1], /* () */0));
        
      }
    }
  }
}

function make_from_fmtty(k, o, acc, fmtty, fmt) {
  if (typeof fmtty === "number") {
    return make_invalid_arg(k, o, acc, fmt);
  } else {
    switch (fmtty.tag | 0) {
      case 0 : 
          var rest = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest, fmt);
            });
      case 1 : 
          var rest$1 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$1, fmt);
            });
      case 2 : 
          var rest$2 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$2, fmt);
            });
      case 3 : 
          var rest$3 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$3, fmt);
            });
      case 4 : 
          var rest$4 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$4, fmt);
            });
      case 5 : 
          var rest$5 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$5, fmt);
            });
      case 6 : 
          var rest$6 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$6, fmt);
            });
      case 7 : 
          var rest$7 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$7, fmt);
            });
      case 8 : 
          var rest$8 = fmtty[1];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$8, fmt);
            });
      case 9 : 
          var rest$9 = fmtty[2];
          var ty = trans(symm(fmtty[0]), fmtty[1]);
          return (function () {
              return make_from_fmtty(k, o, acc, concat_fmtty(ty, rest$9), fmt);
            });
      case 10 : 
          var rest$10 = fmtty[0];
          return (function (_, _$1) {
              return make_from_fmtty(k, o, acc, rest$10, fmt);
            });
      case 11 : 
          var rest$11 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$11, fmt);
            });
      case 12 : 
          var rest$12 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$12, fmt);
            });
      case 13 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  1540,
                  31
                ]
              ];
      case 14 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  1541,
                  31
                ]
              ];
      
    }
  }
}

function make_invalid_arg(k, o, acc, fmt) {
  return make_printf(k, o, /* Acc_invalid_arg */__(8, [
                acc,
                "Printf: bad conversion %_"
              ]), fmt);
}

function make_string_padding(k, o, acc, fmt, pad, trans) {
  if (typeof pad === "number") {
    return (function (x) {
        var new_acc_001 = _1(trans, x);
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  } else if (pad.tag) {
    var padty = pad[0];
    return (function (w, x) {
        var new_acc_001 = fix_padding(padty, w, _1(trans, x));
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  } else {
    var width = pad[1];
    var padty$1 = pad[0];
    return (function (x) {
        var new_acc_001 = fix_padding(padty$1, width, _1(trans, x));
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  }
}

function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans, iconv) {
  if (typeof pad === "number") {
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_int_precision(p, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = _2(trans, iconv, x);
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p = prec[0];
      return (function (x) {
          var str = fix_int_precision(p, _2(trans, iconv, x));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  } else if (pad.tag) {
    var padty = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (w, p, x) {
            var str = fix_padding(padty, w, fix_int_precision(p, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (w, x) {
            var str = fix_padding(padty, w, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p$1 = prec[0];
      return (function (w, x) {
          var str = fix_padding(padty, w, fix_int_precision(p$1, _2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  } else {
    var w = pad[1];
    var padty$1 = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_padding(padty$1, w, fix_int_precision(p, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = fix_padding(padty$1, w, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p$2 = prec[0];
      return (function (x) {
          var str = fix_padding(padty$1, w, fix_int_precision(p$2, _2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  }
}

function make_custom(k, o, acc, rest, arity, f) {
  if (arity) {
    var arity$1 = arity[0];
    return (function (x) {
        return make_custom(k, o, acc, rest, arity$1, _1(f, x));
      });
  } else {
    return make_printf(k, o, /* Acc_data_string */__(4, [
                  acc,
                  f
                ]), rest);
  }
}

function output_acc(o, _acc) {
  while(true) {
    var acc = _acc;
    var exit$$1 = 0;
    if (typeof acc === "number") {
      return /* () */0;
    } else {
      switch (acc.tag | 0) {
        case 0 : 
            var s = string_of_formatting_lit(acc[1]);
            output_acc(o, acc[0]);
            return output_string(o, s);
        case 1 : 
            var match = acc[1];
            var p = acc[0];
            output_acc(o, p);
            if (match.tag) {
              output_string(o, "@[");
              _acc = match[0];
              continue ;
              
            } else {
              output_string(o, "@{");
              _acc = match[0];
              continue ;
              
            }
            break;
        case 2 : 
        case 4 : 
            exit$$1 = 1;
            break;
        case 3 : 
        case 5 : 
            exit$$1 = 2;
            break;
        case 6 : 
            output_acc(o, acc[0]);
            return _1(acc[1], o);
        case 7 : 
            output_acc(o, acc[0]);
            return caml_ml_flush(o);
        case 8 : 
            output_acc(o, acc[0]);
            throw [
                  invalid_argument,
                  acc[1]
                ];
        
      }
    }
    switch (exit$$1) {
      case 1 : 
          output_acc(o, acc[0]);
          return output_string(o, acc[1]);
      case 2 : 
          output_acc(o, acc[0]);
          return caml_ml_output_char(o, acc[1]);
      
    }
  }
}


/* No side effect */

function kfprintf(k, o, param) {
  return make_printf((function (o, acc) {
                output_acc(o, acc);
                return _1(k, o);
              }), o, /* End_of_acc */0, param[0]);
}

function fprintf(oc, fmt) {
  return kfprintf((function () {
                return /* () */0;
              }), oc, fmt);
}

function printf(fmt) {
  return fprintf(stdout, fmt);
}


/* No side effect */

var Bottom = create("Array.Bottom");


/* No side effect */

/* No side effect */

/* No side effect */

function cmn(q, a, b, x, s, t) {
  var a$1 = ((a + q | 0) + x | 0) + t | 0;
  return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
}

function f(a, b, c, d, x, s, t) {
  return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
}

function g(a, b, c, d, x, s, t) {
  return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
}

function h(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function i(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
}

function cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = f(a, b, c, d, k[0], 7, -680876936);
  d = f(d, a, b, c, k[1], 12, -389564586);
  c = f(c, d, a, b, k[2], 17, 606105819);
  b = f(b, c, d, a, k[3], 22, -1044525330);
  a = f(a, b, c, d, k[4], 7, -176418897);
  d = f(d, a, b, c, k[5], 12, 1200080426);
  c = f(c, d, a, b, k[6], 17, -1473231341);
  b = f(b, c, d, a, k[7], 22, -45705983);
  a = f(a, b, c, d, k[8], 7, 1770035416);
  d = f(d, a, b, c, k[9], 12, -1958414417);
  c = f(c, d, a, b, k[10], 17, -42063);
  b = f(b, c, d, a, k[11], 22, -1990404162);
  a = f(a, b, c, d, k[12], 7, 1804603682);
  d = f(d, a, b, c, k[13], 12, -40341101);
  c = f(c, d, a, b, k[14], 17, -1502002290);
  b = f(b, c, d, a, k[15], 22, 1236535329);
  a = g(a, b, c, d, k[1], 5, -165796510);
  d = g(d, a, b, c, k[6], 9, -1069501632);
  c = g(c, d, a, b, k[11], 14, 643717713);
  b = g(b, c, d, a, k[0], 20, -373897302);
  a = g(a, b, c, d, k[5], 5, -701558691);
  d = g(d, a, b, c, k[10], 9, 38016083);
  c = g(c, d, a, b, k[15], 14, -660478335);
  b = g(b, c, d, a, k[4], 20, -405537848);
  a = g(a, b, c, d, k[9], 5, 568446438);
  d = g(d, a, b, c, k[14], 9, -1019803690);
  c = g(c, d, a, b, k[3], 14, -187363961);
  b = g(b, c, d, a, k[8], 20, 1163531501);
  a = g(a, b, c, d, k[13], 5, -1444681467);
  d = g(d, a, b, c, k[2], 9, -51403784);
  c = g(c, d, a, b, k[7], 14, 1735328473);
  b = g(b, c, d, a, k[12], 20, -1926607734);
  a = h(a, b, c, d, k[5], 4, -378558);
  d = h(d, a, b, c, k[8], 11, -2022574463);
  c = h(c, d, a, b, k[11], 16, 1839030562);
  b = h(b, c, d, a, k[14], 23, -35309556);
  a = h(a, b, c, d, k[1], 4, -1530992060);
  d = h(d, a, b, c, k[4], 11, 1272893353);
  c = h(c, d, a, b, k[7], 16, -155497632);
  b = h(b, c, d, a, k[10], 23, -1094730640);
  a = h(a, b, c, d, k[13], 4, 681279174);
  d = h(d, a, b, c, k[0], 11, -358537222);
  c = h(c, d, a, b, k[3], 16, -722521979);
  b = h(b, c, d, a, k[6], 23, 76029189);
  a = h(a, b, c, d, k[9], 4, -640364487);
  d = h(d, a, b, c, k[12], 11, -421815835);
  c = h(c, d, a, b, k[15], 16, 530742520);
  b = h(b, c, d, a, k[2], 23, -995338651);
  a = i(a, b, c, d, k[0], 6, -198630844);
  d = i(d, a, b, c, k[7], 10, 1126891415);
  c = i(c, d, a, b, k[14], 15, -1416354905);
  b = i(b, c, d, a, k[5], 21, -57434055);
  a = i(a, b, c, d, k[12], 6, 1700485571);
  d = i(d, a, b, c, k[3], 10, -1894986606);
  c = i(c, d, a, b, k[10], 15, -1051523);
  b = i(b, c, d, a, k[1], 21, -2054922799);
  a = i(a, b, c, d, k[8], 6, 1873313359);
  d = i(d, a, b, c, k[15], 10, -30611744);
  c = i(c, d, a, b, k[6], 15, -1560198380);
  b = i(b, c, d, a, k[13], 21, 1309151649);
  a = i(a, b, c, d, k[4], 6, -145523070);
  d = i(d, a, b, c, k[11], 10, -1120210379);
  c = i(c, d, a, b, k[2], 15, 718787259);
  b = i(b, c, d, a, k[9], 21, -343485551);
  x[0] = a + x[0] | 0;
  x[1] = b + x[1] | 0;
  x[2] = c + x[2] | 0;
  x[3] = d + x[3] | 0;
  return /* () */0;
}

var state = /* array */[
  1732584193,
  -271733879,
  -1732584194,
  271733878
];

var md5blk = /* array */[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

function caml_md5_string(s, start, len) {
  var s$1 = s.slice(start, len);
  var n = s$1.length;
  state[0] = 1732584193;
  state[1] = -271733879;
  state[2] = -1732584194;
  state[3] = 271733878;
  for(var i = 0; i <= 15; ++i){
    md5blk[i] = 0;
  }
  var i_end = n / 64 | 0;
  for(var i$1 = 1; i$1 <= i_end; ++i$1){
    for(var j = 0; j <= 15; ++j){
      var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
      md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
    }
    cycle(state, md5blk);
  }
  var s_tail = s$1.slice((i_end << 6));
  for(var kk = 0; kk <= 15; ++kk){
    md5blk[kk] = 0;
  }
  var i_end$1 = s_tail.length - 1 | 0;
  for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
    md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
  }
  var i$3 = i_end$1 + 1 | 0;
  md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
  if (i$3 > 55) {
    cycle(state, md5blk);
    for(var i$4 = 0; i$4 <= 15; ++i$4){
      md5blk[i$4] = 0;
    }
  }
  md5blk[14] = (n << 3);
  cycle(state, md5blk);
  return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
}


/* No side effect */

function string(str) {
  return caml_md5_string(str, 0, str.length);
}


/* No side effect */

/* No side effect */

function full_init(s, seed) {
  var combine = function (accu, x) {
    return string(accu + x);
  };
  var extract = function (d) {
    return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length ? seed : /* int array */[0];
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    caml_array_set(s[/* st */0], i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + max(55, l) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, caml_array_get(seed$1, k));
    caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
  }
  s[/* idx */1] = 0;
  return /* () */0;
}

function bits(s) {
  s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
  var curval = caml_array_get(s[/* st */0], s[/* idx */1]);
  var newval = caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
  var newval30 = newval & 1073741823;
  caml_array_set(s[/* st */0], s[/* idx */1], newval30);
  return newval30;
}

function $$int(s, bound) {
  if (bound > 1073741823 || bound <= 0) {
    throw [
          invalid_argument,
          "Random.int"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var r = bits(s$1);
      var v = r % n;
      if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
        continue ;
        
      } else {
        return v;
      }
    }
  }
}

var $$default = /* record */[
  /* st : array */[
    987910699,
    495797812,
    364182224,
    414272206,
    318284740,
    990407751,
    383018966,
    270373319,
    840823159,
    24560019,
    536292337,
    512266505,
    189156120,
    730249596,
    143776328,
    51606627,
    140166561,
    366354223,
    1003410265,
    700563762,
    981890670,
    913149062,
    526082594,
    1021425055,
    784300257,
    667753350,
    630144451,
    949649812,
    48546892,
    415514493,
    258888527,
    511570777,
    89983870,
    283659902,
    308386020,
    242688715,
    482270760,
    865188196,
    1027664170,
    207196989,
    193777847,
    619708188,
    671350186,
    149669678,
    257044018,
    87658204,
    558145612,
    183450813,
    28133145,
    901332182,
    710253903,
    510646120,
    652377910,
    409934019,
    801085050
  ],
  /* idx */0
];

function $$int$1(bound) {
  return $$int($$default, bound);
}

function full_init$1(seed) {
  return full_init($$default, seed);
}

function self_init() {
  return full_init$1(caml_sys_random_seed(/* () */0));
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
function render_bbox(sprite, param) {
  var context = sprite[/* context */1];
  var match = sprite[/* params */0][/* bbox_offset */5];
  var match$1 = sprite[/* params */0][/* bbox_size */6];
  context.strokeStyle = "#FF0000";
  return context.strokeRect(param[0] + match[0], param[1] + match[1], match$1[0], match$1[1]);
}

function render(sprite, param) {
  var context = sprite[/* context */1];
  var match = sprite[/* params */0][/* src_offset */4];
  var match$1 = sprite[/* params */0][/* frame_size */3];
  var sw = match$1[0];
  var match$2 = sprite[/* params */0][/* frame_size */3];
  var sx = match[0] + sprite[/* frame */2][0] * sw;
  return context.drawImage(sprite[/* img */4], sx, match[1], sw, match$1[1], param[0], param[1], match$2[0], match$2[1]);
}

function draw_bgd(bgd, off_x) {
  render(bgd, /* tuple */[
        -off_x,
        0
      ]);
  return render(bgd, /* tuple */[
              bgd[/* params */0][/* frame_size */3][0] - off_x,
              0
            ]);
}

function clear_canvas(canvas) {
  var context = canvas.getContext("2d");
  var cwidth = canvas.width;
  var cheight = canvas.height;
  context.clearRect(0, 0, cwidth, cheight);
  return /* () */0;
}

function hud(canvas, score, coins) {
  var score_string = string_of_int(score);
  var coin_string = string_of_int(coins);
  var context = canvas.getContext("2d");
  context.font = "10px 'Press Start 2P'";
  context.fillText("Score: " + score_string, canvas.width - 140, 18);
  context.fillText("Coins: " + coin_string, 120, 18);
  return /* () */0;
}

function fps(canvas, fps_val) {
  var fps_str = string_of_int(fps_val | 0);
  var context = canvas.getContext("2d");
  context.fillText(fps_str, 10, 18);
  return /* () */0;
}

function game_win(ctx) {
  ctx.rect(0, 0, 512, 512);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillText("You win!", 180, 128);
  return failwith("Game over.");
}

function game_loss(ctx) {
  ctx.rect(0, 0, 512, 512);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillText("GAME OVER. You lose!", 60, 128);
  return failwith("Game over.");
}


/*  Not a pure module */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
function setup_sprite($staropt$star, $staropt$star$1, $staropt$star$2, img_src, max_frames, max_ticks, frame_size, src_offset) {
  var loop = $staropt$star ? $staropt$star[0] : /* true */1;
  var bbox_offset = $staropt$star$1 ? $staropt$star$1[0] : /* tuple */[
      0,
      0
    ];
  var bbox_size = $staropt$star$2 ? $staropt$star$2[0] : /* tuple */[
      0,
      0
    ];
  var bbox_size$1 = caml_equal(bbox_size, /* tuple */[
        0,
        0
      ]) ? frame_size : bbox_size;
  var img_src$1 = "./sprites/" + img_src;
  return /* record */[
          /* max_frames */max_frames,
          /* max_ticks */max_ticks,
          /* img_src */img_src$1,
          /* frame_size */frame_size,
          /* src_offset */src_offset,
          /* bbox_offset */bbox_offset,
          /* bbox_size */bbox_size$1,
          /* loop */loop
        ];
}

function make_enemy(param) {
  var dir = param[1];
  switch (param[0]) {
    case 0 : 
        return setup_sprite(/* None */0, /* Some */[/* tuple */[
                      1,
                      1
                    ]], /* Some */[/* tuple */[
                      14,
                      14
                    ]], "enemies.png", 2, 10, /* tuple */[
                    16,
                    16
                  ], /* tuple */[
                    0,
                    128
                  ]);
    case 1 : 
        if (dir !== 0) {
          return setup_sprite(/* None */0, /* Some */[/* tuple */[
                        1,
                        10
                      ]], /* Some */[/* tuple */[
                        11,
                        16
                      ]], "enemies.png", 2, 10, /* tuple */[
                      16,
                      27
                    ], /* tuple */[
                      32,
                      69
                    ]);
        } else {
          return setup_sprite(/* None */0, /* Some */[/* tuple */[
                        4,
                        10
                      ]], /* Some */[/* tuple */[
                        11,
                        16
                      ]], "enemies.png", 2, 10, /* tuple */[
                      16,
                      27
                    ], /* tuple */[
                      0,
                      69
                    ]);
        }
    case 2 : 
        if (dir !== 0) {
          return setup_sprite(/* None */0, /* Some */[/* tuple */[
                        1,
                        10
                      ]], /* Some */[/* tuple */[
                        11,
                        16
                      ]], "enemies.png", 2, 10, /* tuple */[
                      16,
                      27
                    ], /* tuple */[
                      32,
                      5
                    ]);
        } else {
          return setup_sprite(/* None */0, /* Some */[/* tuple */[
                        4,
                        10
                      ]], /* Some */[/* tuple */[
                        11,
                        16
                      ]], "enemies.png", 2, 10, /* tuple */[
                      16,
                      27
                    ], /* tuple */[
                      0,
                      5
                    ]);
        }
    case 3 : 
        return setup_sprite(/* None */0, /* Some */[/* tuple */[
                      2,
                      2
                    ]], /* Some */[/* tuple */[
                      12,
                      13
                    ]], "enemies.png", 4, 10, /* tuple */[
                    16,
                    16
                  ], /* tuple */[
                    0,
                    96
                  ]);
    case 4 : 
        return setup_sprite(/* None */0, /* Some */[/* tuple */[
                      2,
                      2
                    ]], /* Some */[/* tuple */[
                      12,
                      13
                    ]], "enemies.png", 4, 10, /* tuple */[
                    16,
                    16
                  ], /* tuple */[
                    0,
                    32
                  ]);
    
  }
}

function make_particle(param) {
  switch (param) {
    case 0 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "enemies.png", 1, 0, /* tuple */[
                    16,
                    16
                  ], /* tuple */[
                    0,
                    144
                  ]);
    case 1 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "chunks.png", 1, 0, /* tuple */[
                    8,
                    8
                  ], /* tuple */[
                    0,
                    0
                  ]);
    case 2 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "chunks.png", 1, 0, /* tuple */[
                    8,
                    8
                  ], /* tuple */[
                    8,
                    0
                  ]);
    case 3 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    12,
                    8
                  ], /* tuple */[
                    0,
                    0
                  ]);
    case 4 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    12,
                    9
                  ], /* tuple */[
                    0,
                    9
                  ]);
    case 5 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    12,
                    9
                  ], /* tuple */[
                    0,
                    18
                  ]);
    case 6 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    12,
                    9
                  ], /* tuple */[
                    0,
                    27
                  ]);
    case 7 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    14,
                    9
                  ], /* tuple */[
                    13,
                    0
                  ]);
    case 8 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    14,
                    9
                  ], /* tuple */[
                    13,
                    9
                  ]);
    case 9 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    14,
                    9
                  ], /* tuple */[
                    13,
                    18
                  ]);
    case 10 : 
        return setup_sprite(/* None */0, /* None */0, /* None */0, "score.png", 1, 0, /* tuple */[
                    14,
                    9
                  ], /* tuple */[
                    13,
                    27
                  ]);
    
  }
}

function make_type$1(typ, dir) {
  switch (typ.tag | 0) {
    case 0 : 
        var pt = typ[0];
        var spr_type = /* tuple */[
          typ[1],
          dir
        ];
        if (pt !== 0) {
          var param = spr_type;
          var typ$1 = param[0];
          if (param[1] !== 0) {
            switch (typ$1) {
              case 0 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                1,
                                1
                              ]], /* Some */[/* tuple */[
                                11,
                                15
                              ]], "mario-small.png", 1, 0, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              0,
                              32
                            ]);
              case 1 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                13,
                                15
                              ]], "mario-small.png", 2, 10, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              16,
                              48
                            ]);
              case 2 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                12,
                                15
                              ]], "mario-small.png", 3, 5, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              16,
                              32
                            ]);
              case 3 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                1,
                                5
                              ]], /* Some */[/* tuple */[
                                14,
                                10
                              ]], "mario-small.png", 1, 0, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              0,
                              64
                            ]);
              
            }
          } else {
            switch (typ$1) {
              case 0 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                3,
                                1
                              ]], /* Some */[/* tuple */[
                                11,
                                15
                              ]], "mario-small.png", 1, 0, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              0,
                              0
                            ]);
              case 1 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                13,
                                15
                              ]], "mario-small.png", 2, 10, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              16,
                              16
                            ]);
              case 2 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                12,
                                15
                              ]], "mario-small.png", 3, 5, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              16,
                              0
                            ]);
              case 3 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                1,
                                5
                              ]], /* Some */[/* tuple */[
                                14,
                                10
                              ]], "mario-small.png", 1, 0, /* tuple */[
                              16,
                              16
                            ], /* tuple */[
                              0,
                              64
                            ]);
              
            }
          }
        } else {
          var param$1 = spr_type;
          var typ$2 = param$1[0];
          if (param$1[1] !== 0) {
            switch (typ$2) {
              case 0 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                1,
                                1
                              ]], /* Some */[/* tuple */[
                                13,
                                25
                              ]], "mario-big.png", 1, 0, /* tuple */[
                              16,
                              26
                            ], /* tuple */[
                              16,
                              69
                            ]);
              case 1 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                12,
                                25
                              ]], "mario-big.png", 1, 0, /* tuple */[
                              16,
                              26
                            ], /* tuple */[
                              48,
                              70
                            ]);
              case 2 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                13,
                                25
                              ]], "mario-big.png", 4, 10, /* tuple */[
                              16,
                              27
                            ], /* tuple */[
                              0,
                              101
                            ]);
              case 3 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                10
                              ]], /* Some */[/* tuple */[
                                13,
                                17
                              ]], "mario-big.png", 1, 0, /* tuple */[
                              16,
                              27
                            ], /* tuple */[
                              32,
                              69
                            ]);
              
            }
          } else {
            switch (typ$2) {
              case 0 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                13,
                                25
                              ]], "mario-big.png", 1, 0, /* tuple */[
                              16,
                              27
                            ], /* tuple */[
                              16,
                              5
                            ]);
              case 1 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                12,
                                25
                              ]], "mario-big.png", 1, 0, /* tuple */[
                              16,
                              26
                            ], /* tuple */[
                              48,
                              6
                            ]);
              case 2 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                1
                              ]], /* Some */[/* tuple */[
                                13,
                                25
                              ]], "mario-big.png", 4, 10, /* tuple */[
                              16,
                              27
                            ], /* tuple */[
                              0,
                              37
                            ]);
              case 3 : 
                  return setup_sprite(/* None */0, /* Some */[/* tuple */[
                                2,
                                10
                              ]], /* Some */[/* tuple */[
                                13,
                                17
                              ]], "mario-big.png", 1, 0, /* tuple */[
                              16,
                              27
                            ], /* tuple */[
                              32,
                              5
                            ]);
              
            }
          }
        }
    case 1 : 
        return make_enemy(/* tuple */[
                    typ[0],
                    dir
                  ]);
    case 2 : 
        var param$2 = typ[0];
        switch (param$2) {
          case 0 : 
              return setup_sprite(/* None */0, /* Some */[/* tuple */[
                            2,
                            0
                          ]], /* Some */[/* tuple */[
                            12,
                            16
                          ]], "items.png", 1, 0, /* tuple */[
                          16,
                          16
                        ], /* tuple */[
                          0,
                          0
                        ]);
          case 1 : 
              return setup_sprite(/* None */0, /* None */0, /* None */0, "items.png", 1, 0, /* tuple */[
                          16,
                          16
                        ], /* tuple */[
                          0,
                          188
                        ]);
          case 2 : 
              return setup_sprite(/* None */0, /* None */0, /* None */0, "items.png", 1, 0, /* tuple */[
                          16,
                          16
                        ], /* tuple */[
                          16,
                          48
                        ]);
          case 3 : 
              return setup_sprite(/* None */0, /* Some */[/* tuple */[
                            3,
                            0
                          ]], /* Some */[/* tuple */[
                            12,
                            16
                          ]], "items.png", 3, 15, /* tuple */[
                          16,
                          16
                        ], /* tuple */[
                          0,
                          80
                        ]);
          
        }
    case 3 : 
        var param$3 = typ[0];
        if (typeof param$3 === "number") {
          switch (param$3) {
            case 0 : 
                return setup_sprite(/* None */0, /* None */0, /* None */0, "blocks.png", 1, 0, /* tuple */[
                            16,
                            16
                          ], /* tuple */[
                            0,
                            32
                          ]);
            case 1 : 
                return setup_sprite(/* None */0, /* None */0, /* None */0, "blocks.png", 5, 10, /* tuple */[
                            16,
                            16
                          ], /* tuple */[
                            0,
                            0
                          ]);
            case 2 : 
                return setup_sprite(/* None */0, /* None */0, /* None */0, "blocks.png", 1, 0, /* tuple */[
                            16,
                            16
                          ], /* tuple */[
                            0,
                            48
                          ]);
            case 3 : 
                return setup_sprite(/* None */0, /* None */0, /* None */0, "blocks.png", 1, 0, /* tuple */[
                            16,
                            16
                          ], /* tuple */[
                            0,
                            64
                          ]);
            case 4 : 
                return setup_sprite(/* None */0, /* None */0, /* None */0, "panel.png", 3, 15, /* tuple */[
                            26,
                            26
                          ], /* tuple */[
                            0,
                            0
                          ]);
            case 5 : 
                return setup_sprite(/* None */0, /* None */0, /* None */0, "ground.png", 1, 0, /* tuple */[
                            16,
                            16
                          ], /* tuple */[
                            0,
                            32
                          ]);
            
          }
        } else {
          return setup_sprite(/* None */0, /* None */0, /* None */0, "blocks.png", 4, 15, /* tuple */[
                      16,
                      16
                    ], /* tuple */[
                      0,
                      16
                    ]);
        }
    
  }
}

function make_from_params(params, context) {
  var img = document.createElement("img");
  img.src = params[/* img_src */2];
  return /* record */[
          /* params */params,
          /* context */context,
          /* frame */[0],
          /* ticks */[0],
          /* img */img
        ];
}

function make$4(spawn, dir, context) {
  var params = make_type$1(spawn, dir);
  return make_from_params(params, context);
}

function make_bgd(context) {
  var params = setup_sprite(/* None */0, /* None */0, /* None */0, "bgd-1.png", 1, 0, /* tuple */[
        512,
        256
      ], /* tuple */[
        0,
        0
      ]);
  return make_from_params(params, context);
}

function make_particle$1(ptyp, context) {
  var params = make_particle(ptyp);
  return make_from_params(params, context);
}

function transform_enemy(enemy_typ, spr, dir) {
  var params = make_enemy(/* tuple */[
        enemy_typ,
        dir
      ]);
  var img = document.createElement("img");
  img.src = params[/* img_src */2];
  spr[/* params */0] = params;
  spr[/* img */4] = img;
  return /* () */0;
}

function update_animation(spr) {
  var curr_ticks = spr[/* ticks */3][0];
  if (curr_ticks >= spr[/* params */0][/* max_ticks */1]) {
    spr[/* ticks */3][0] = 0;
    if (spr[/* params */0][/* loop */7]) {
      spr[/* frame */2][0] = mod_(spr[/* frame */2][0] + 1 | 0, spr[/* params */0][/* max_frames */0]);
      return /* () */0;
    } else {
      return 0;
    }
  } else {
    spr[/* ticks */3][0] = curr_ticks + 1 | 0;
    return /* () */0;
  }
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
function pair_to_xy(pair) {
  return /* float array */[
          pair[0],
          pair[1]
        ];
}

function make_type$2(typ, ctx) {
  if (typ === 2 || typ === 1) {
    return /* record */[
            /* sprite */make_particle$1(typ, ctx),
            /* rot */0,
            /* lifetime */300
          ];
  } else {
    return /* record */[
            /* sprite */make_particle$1(typ, ctx),
            /* rot */0,
            /* lifetime */30
          ];
  }
}

function make$5($staropt$star, $staropt$star$1, part_type, pos, ctx) {
  var vel = $staropt$star ? $staropt$star[0] : /* tuple */[
      0,
      0
    ];
  var acc = $staropt$star$1 ? $staropt$star$1[0] : /* tuple */[
      0,
      0
    ];
  var params = make_type$2(part_type, ctx);
  var pos$1 = pair_to_xy(pos);
  var vel$1 = pair_to_xy(vel);
  var acc$1 = pair_to_xy(acc);
  return /* record */[
          /* params */params,
          /* part_type */part_type,
          /* pos */pos$1,
          /* vel */vel$1,
          /* acc */acc$1,
          /* kill : false */0,
          /* life */params[/* lifetime */2]
        ];
}

function make_score(score, pos, ctx) {
  var t = score >= 801 ? (
      score >= 2001 ? (
          score !== 4000 ? (
              score !== 8000 ? /* Score100 */3 : /* Score8000 */10
            ) : /* Score4000 */9
        ) : (
          score !== 1000 ? (
              score >= 2000 ? /* Score2000 */8 : /* Score100 */3
            ) : /* Score1000 */7
        )
    ) : (
      score >= 201 ? (
          score !== 400 ? (
              score >= 800 ? /* Score800 */6 : /* Score100 */3
            ) : /* Score400 */5
        ) : (
          score !== 100 && score >= 200 ? /* Score200 */4 : /* Score100 */3
        )
    );
  return make$5(/* Some */[/* tuple */[
                0.5,
                -0.7
              ]], /* None */0, t, pos, ctx);
}

function update_vel$1(part) {
  part[/* vel */3][/* x */0] = part[/* vel */3][/* x */0] + part[/* acc */4][/* x */0];
  part[/* vel */3][/* y */1] = part[/* vel */3][/* y */1] + part[/* acc */4][/* y */1];
  return /* () */0;
}

function $$process(part) {
  part[/* life */6] = part[/* life */6] - 1 | 0;
  if (!part[/* life */6]) {
    part[/* kill */5] = /* true */1;
  }
  update_vel$1(part);
  var part$1 = part;
  part$1[/* pos */2][/* x */0] = part$1[/* vel */3][/* x */0] + part$1[/* pos */2][/* x */0];
  part$1[/* pos */2][/* y */1] = part$1[/* vel */3][/* y */1] + part$1[/* pos */2][/* y */1];
  return /* () */0;
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
var id_counter = [min_int];

function setup_obj($staropt$star, $staropt$star$1, _) {
  var has_gravity = $staropt$star ? $staropt$star[0] : /* true */1;
  var speed = $staropt$star$1 ? $staropt$star$1[0] : 1;
  return /* record */[
          /* has_gravity */has_gravity,
          /* speed */speed
        ];
}

function set_vel_to_speed(obj) {
  var speed = obj[/* params */0][/* speed */1];
  var match = obj[/* dir */6];
  if (match !== 0) {
    obj[/* vel */2][/* x */0] = speed;
    return /* () */0;
  } else {
    obj[/* vel */2][/* x */0] = -speed;
    return /* () */0;
  }
}

function make_type(param) {
  switch (param.tag | 0) {
    case 0 : 
        return setup_obj(/* None */0, /* Some */[2.8], /* () */0);
    case 1 : 
        var param$1 = param[0];
        if (param$1 >= 3) {
          return setup_obj(/* None */0, /* Some */[3], /* () */0);
        } else {
          return setup_obj(/* None */0, /* None */0, /* () */0);
        }
    case 2 : 
        var param$2 = param[0];
        if (param$2 >= 3) {
          return setup_obj(/* Some */[/* false */0], /* None */0, /* () */0);
        } else {
          return setup_obj(/* None */0, /* None */0, /* () */0);
        }
    case 3 : 
        return setup_obj(/* Some */[/* false */0], /* None */0, /* () */0);
    
  }
}

function new_id() {
  id_counter[0] = id_counter[0] + 1 | 0;
  return id_counter[0];
}

function make$3($staropt$star, $staropt$star$1, spawnable, context, param) {
  var id = $staropt$star ? $staropt$star[0] : /* None */0;
  var dir = $staropt$star$1 ? $staropt$star$1[0] : /* Left */0;
  var spr = make$4(spawnable, dir, context);
  var params = make_type(spawnable);
  var id$1 = id ? id[0] : new_id(/* () */0);
  var obj = /* record */[
    /* params */params,
    /* pos : float array */[
      param[0],
      param[1]
    ],
    /* vel : float array */[
      0.0,
      0.0
    ],
    /* id */id$1,
    /* jumping : false */0,
    /* grounded : false */0,
    /* dir */dir,
    /* invuln */0,
    /* kill : false */0,
    /* health */1,
    /* crouch : false */0,
    /* score */0
  ];
  return /* tuple */[
          spr,
          obj
        ];
}

function spawn(spawnable, context, param) {
  var match = make$3(/* None */0, /* None */0, spawnable, context, /* tuple */[
        param[0],
        param[1]
      ]);
  var obj = match[1];
  var spr = match[0];
  switch (spawnable.tag | 0) {
    case 0 : 
        return /* Player */__(0, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    case 1 : 
        set_vel_to_speed(obj);
        return /* Enemy */__(1, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    case 2 : 
        return /* Item */__(2, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    case 3 : 
        return /* Block */__(3, [
                  spawnable[0],
                  spr,
                  obj
                ]);
    
  }
}

function get_sprite(param) {
  return param[1];
}

function get_obj(param) {
  return param[2];
}

function is_player(param) {
  if (param.tag) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function is_enemy(param) {
  if (param.tag === 1) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function equals(col1, col2) {
  return +(col1[2][/* id */3] === col2[2][/* id */3]);
}

function normalize_pos(pos, p1, p2) {
  var match = p1[/* bbox_offset */5];
  var match$1 = p2[/* bbox_offset */5];
  var match$2 = p1[/* bbox_size */6];
  var match$3 = p2[/* bbox_size */6];
  pos[/* x */0] = pos[/* x */0] - (match$3[0] + match$1[0]) + (match$2[0] + match[0]);
  pos[/* y */1] = pos[/* y */1] - (match$3[1] + match$1[1]) + (match$2[1] + match[1]);
  return /* () */0;
}

function update_player(player, keys, context) {
  var prev_jumping = player[/* jumping */4];
  var prev_dir = player[/* dir */6];
  var prev_vx = Math.abs(player[/* vel */2][/* x */0]);
  iter((function (param) {
          var player$1 = player;
          var controls = param;
          var lr_acc = player$1[/* vel */2][/* x */0] * 0.2;
          switch (controls) {
            case 0 : 
                if (player$1[/* crouch */10]) {
                  return 0;
                } else {
                  if (player$1[/* vel */2][/* x */0] > -player$1[/* params */0][/* speed */1]) {
                    player$1[/* vel */2][/* x */0] = player$1[/* vel */2][/* x */0] - (0.4 - lr_acc);
                  }
                  player$1[/* dir */6] = /* Left */0;
                  return /* () */0;
                }
                break;
            case 1 : 
                if (player$1[/* crouch */10]) {
                  return 0;
                } else {
                  if (player$1[/* vel */2][/* x */0] < player$1[/* params */0][/* speed */1]) {
                    player$1[/* vel */2][/* x */0] = player$1[/* vel */2][/* x */0] + (0.4 + lr_acc);
                  }
                  player$1[/* dir */6] = /* Right */1;
                  return /* () */0;
                }
                break;
            case 2 : 
                if (!player$1[/* jumping */4] && player$1[/* grounded */5]) {
                  player$1[/* jumping */4] = /* true */1;
                  player$1[/* grounded */5] = /* false */0;
                  player$1[/* vel */2][/* y */1] = max(player$1[/* vel */2][/* y */1] - (5.7 + Math.abs(player$1[/* vel */2][/* x */0]) * 0.25), -6);
                  return /* () */0;
                } else {
                  return 0;
                }
            case 3 : 
                if (!player$1[/* jumping */4] && player$1[/* grounded */5]) {
                  player$1[/* crouch */10] = /* true */1;
                  return /* () */0;
                } else {
                  return 0;
                }
            
          }
        }), keys);
  var v = player[/* vel */2][/* x */0] * 0.9;
  var vel_damped = Math.abs(v) < 0.1 ? 0 : v;
  player[/* vel */2][/* x */0] = vel_damped;
  var pl_typ = player[/* health */9] <= 1 ? /* SmallM */1 : /* BigM */0;
  if (!prev_jumping && player[/* jumping */4]) {
    return /* Some */[/* tuple */[
              pl_typ,
              make$4(/* SPlayer */__(0, [
                      pl_typ,
                      /* Jumping */1
                    ]), player[/* dir */6], context)
            ]];
  } else if (caml_notequal(prev_dir, player[/* dir */6]) || prev_vx === 0 && Math.abs(player[/* vel */2][/* x */0]) > 0 && !player[/* jumping */4]) {
    return /* Some */[/* tuple */[
              pl_typ,
              make$4(/* SPlayer */__(0, [
                      pl_typ,
                      /* Running */2
                    ]), player[/* dir */6], context)
            ]];
  } else if (caml_notequal(prev_dir, player[/* dir */6]) && player[/* jumping */4] && prev_jumping) {
    return /* Some */[/* tuple */[
              pl_typ,
              make$4(/* SPlayer */__(0, [
                      pl_typ,
                      /* Jumping */1
                    ]), player[/* dir */6], context)
            ]];
  } else if (player[/* vel */2][/* y */1] === 0 && player[/* crouch */10]) {
    return /* Some */[/* tuple */[
              pl_typ,
              make$4(/* SPlayer */__(0, [
                      pl_typ,
                      /* Crouching */3
                    ]), player[/* dir */6], context)
            ]];
  } else if (player[/* vel */2][/* y */1] === 0 && player[/* vel */2][/* x */0] === 0) {
    return /* Some */[/* tuple */[
              pl_typ,
              make$4(/* SPlayer */__(0, [
                      pl_typ,
                      /* Standing */0
                    ]), player[/* dir */6], context)
            ]];
  } else {
    return /* None */0;
  }
}

function update_vel(obj) {
  if (obj[/* grounded */5]) {
    obj[/* vel */2][/* y */1] = 0;
    return /* () */0;
  } else if (obj[/* params */0][/* has_gravity */0]) {
    obj[/* vel */2][/* y */1] = min(obj[/* vel */2][/* y */1] + 0.2 + Math.abs(obj[/* vel */2][/* y */1]) * 0.01, 4.5);
    return /* () */0;
  } else {
    return 0;
  }
}

function update_pos(obj) {
  obj[/* pos */1][/* x */0] = obj[/* vel */2][/* x */0] + obj[/* pos */1][/* x */0];
  if (obj[/* params */0][/* has_gravity */0]) {
    obj[/* pos */1][/* y */1] = obj[/* vel */2][/* y */1] + obj[/* pos */1][/* y */1];
    return /* () */0;
  } else {
    return 0;
  }
}

function process_obj(obj, mapy) {
  update_vel(obj);
  update_pos(obj);
  if (obj[/* pos */1][/* y */1] > mapy) {
    obj[/* kill */8] = /* true */1;
    return /* () */0;
  } else {
    return 0;
  }
}

function collide_block($staropt$star, dir, obj) {
  var check_x = $staropt$star ? $staropt$star[0] : /* true */1;
  if (dir !== 1) {
    if (dir !== 0) {
      if (check_x) {
        obj[/* vel */2][/* x */0] = 0;
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      obj[/* vel */2][/* y */1] = -0.001;
      return /* () */0;
    }
  } else {
    obj[/* vel */2][/* y */1] = 0;
    obj[/* grounded */5] = /* true */1;
    obj[/* jumping */4] = /* false */0;
    return /* () */0;
  }
}

function opposite_dir(dir) {
  if (dir !== 0) {
    return /* Left */0;
  } else {
    return /* Right */1;
  }
}

function reverse_left_right(obj) {
  obj[/* vel */2][/* x */0] = -obj[/* vel */2][/* x */0];
  obj[/* dir */6] = opposite_dir(obj[/* dir */6]);
  return /* () */0;
}

function evolve_enemy(player_dir, typ, spr, obj, context) {
  var exit$$1 = 0;
  switch (typ) {
    case 0 : 
        obj[/* kill */8] = /* true */1;
        return /* None */0;
    case 1 : 
        var match = make$3(/* None */0, /* Some */[obj[/* dir */6]], /* SEnemy */__(1, [/* GKoopaShell */3]), context, /* tuple */[
              obj[/* pos */1][/* x */0],
              obj[/* pos */1][/* y */1]
            ]);
        var new_obj = match[1];
        var new_spr = match[0];
        normalize_pos(new_obj[/* pos */1], spr[/* params */0], new_spr[/* params */0]);
        return /* Some */[/* Enemy */__(1, [
                    /* GKoopaShell */3,
                    new_spr,
                    new_obj
                  ])];
    case 2 : 
        var match$1 = make$3(/* None */0, /* Some */[obj[/* dir */6]], /* SEnemy */__(1, [/* RKoopaShell */4]), context, /* tuple */[
              obj[/* pos */1][/* x */0],
              obj[/* pos */1][/* y */1]
            ]);
        var new_obj$1 = match$1[1];
        var new_spr$1 = match$1[0];
        normalize_pos(new_obj$1[/* pos */1], spr[/* params */0], new_spr$1[/* params */0]);
        return /* Some */[/* Enemy */__(1, [
                    /* RKoopaShell */4,
                    new_spr$1,
                    new_obj$1
                  ])];
    case 3 : 
    case 4 : 
        exit$$1 = 1;
        break;
    
  }
  if (exit$$1 === 1) {
    obj[/* dir */6] = player_dir;
    if (obj[/* vel */2][/* x */0] !== 0) {
      obj[/* vel */2][/* x */0] = 0;
    } else {
      set_vel_to_speed(obj);
    }
    return /* None */0;
  }
  
}

function rev_dir(o, t, s) {
  reverse_left_right(o);
  var old_params = s[/* params */0];
  transform_enemy(t, s, o[/* dir */6]);
  return normalize_pos(o[/* pos */1], old_params, s[/* params */0]);
}

function dec_health(obj) {
  var health = obj[/* health */9] - 1 | 0;
  if (health) {
    if (obj[/* invuln */7]) {
      return 0;
    } else {
      obj[/* health */9] = health;
      return /* () */0;
    }
  } else {
    obj[/* kill */8] = /* true */1;
    return /* () */0;
  }
}

function evolve_block(obj, context) {
  dec_health(obj);
  var match = make$3(/* None */0, /* None */0, /* SBlock */__(3, [/* QBlockUsed */0]), context, /* tuple */[
        obj[/* pos */1][/* x */0],
        obj[/* pos */1][/* y */1]
      ]);
  return /* Block */__(3, [
            /* QBlockUsed */0,
            match[0],
            match[1]
          ]);
}

function spawn_above(player_dir, obj, typ, context) {
  var item = spawn(/* SItem */__(2, [typ]), context, /* tuple */[
        obj[/* pos */1][/* x */0],
        obj[/* pos */1][/* y */1]
      ]);
  var item_obj = item[2];
  item_obj[/* pos */1][/* y */1] = item_obj[/* pos */1][/* y */1] - item[1][/* params */0][/* frame_size */3][1];
  item_obj[/* dir */6] = opposite_dir(player_dir);
  set_vel_to_speed(item_obj);
  return item;
}

function get_aabb(obj) {
  var spr = obj[1][/* params */0];
  var obj$1 = obj[2];
  var match = spr[/* bbox_offset */5];
  var match_000 = obj$1[/* pos */1][/* x */0] + match[0];
  var match_001 = obj$1[/* pos */1][/* y */1] + match[1];
  var match$1 = spr[/* bbox_size */6];
  var sy = match$1[1];
  var sx = match$1[0];
  return /* record */[
          /* center : float array */[
            match_000 + sx / 2,
            match_001 + sy / 2
          ],
          /* half : float array */[
            sx / 2,
            sy / 2
          ]
        ];
}

function col_bypass(c1, c2) {
  var o1 = c1[2];
  var o2 = c2[2];
  var ctypes;
  switch (c1.tag | 0) {
    case 0 : 
        ctypes = c2.tag === 1 && c1[2][/* invuln */7] > 0 ? /* true */1 : /* false */0;
        break;
    case 1 : 
        ctypes = c2.tag === 2 ? /* true */1 : /* false */0;
        break;
    case 2 : 
        switch (c2.tag | 0) {
          case 1 : 
          case 2 : 
              ctypes = /* true */1;
              break;
          case 0 : 
          case 3 : 
              ctypes = /* false */0;
              break;
          
        }
        break;
    case 3 : 
        ctypes = /* false */0;
        break;
    
  }
  if (o1[/* kill */8] || o2[/* kill */8]) {
    return /* true */1;
  } else {
    return ctypes;
  }
}

function check_collision(c1, c2) {
  var b1 = get_aabb(c1);
  var b2 = get_aabb(c2);
  var o1 = c1[2];
  if (col_bypass(c1, c2)) {
    return /* None */0;
  } else {
    var vx = b1[/* center */0][/* x */0] - b2[/* center */0][/* x */0];
    var vy = b1[/* center */0][/* y */1] - b2[/* center */0][/* y */1];
    var hwidths = b1[/* half */1][/* x */0] + b2[/* half */1][/* x */0];
    var hheights = b1[/* half */1][/* y */1] + b2[/* half */1][/* y */1];
    if (Math.abs(vx) < hwidths && Math.abs(vy) < hheights) {
      var ox = hwidths - Math.abs(vx);
      var oy = hheights - Math.abs(vy);
      if (ox >= oy) {
        if (vy > 0) {
          o1[/* pos */1][/* y */1] = o1[/* pos */1][/* y */1] + oy;
          return /* Some */[/* North */0];
        } else {
          o1[/* pos */1][/* y */1] = o1[/* pos */1][/* y */1] - oy;
          return /* Some */[/* South */1];
        }
      } else if (vx > 0) {
        o1[/* pos */1][/* x */0] = o1[/* pos */1][/* x */0] + ox;
        return /* Some */[/* West */3];
      } else {
        o1[/* pos */1][/* x */0] = o1[/* pos */1][/* x */0] - ox;
        return /* Some */[/* East */2];
      }
    } else {
      return /* None */0;
    }
  }
}

function kill(collid, ctx) {
  switch (collid.tag | 0) {
    case 0 : 
        return /* [] */0;
    case 1 : 
        var o = collid[2];
        var pos_000 = o[/* pos */1][/* x */0];
        var pos_001 = o[/* pos */1][/* y */1];
        var pos = /* tuple */[
          pos_000,
          pos_001
        ];
        var score = o[/* score */11] > 0 ? /* :: */[
            make_score(o[/* score */11], pos, ctx),
            /* [] */0
          ] : /* [] */0;
        var remains = collid[0] !== 0 ? /* [] */0 : /* :: */[
            make$5(/* None */0, /* None */0, /* GoombaSquish */0, pos, ctx),
            /* [] */0
          ];
        return $at(score, remains);
    case 2 : 
        var o$1 = collid[2];
        if (collid[0] !== 0) {
          return /* [] */0;
        } else {
          return /* :: */[
                  make_score(o$1[/* score */11], /* tuple */[
                        o$1[/* pos */1][/* x */0],
                        o$1[/* pos */1][/* y */1]
                      ], ctx),
                  /* [] */0
                ];
        }
    case 3 : 
        var o$2 = collid[2];
        var t = collid[0];
        if (typeof t === "number") {
          if (t !== 1) {
            return /* [] */0;
          } else {
            var pos_000$1 = o$2[/* pos */1][/* x */0];
            var pos_001$1 = o$2[/* pos */1][/* y */1];
            var pos$1 = /* tuple */[
              pos_000$1,
              pos_001$1
            ];
            var p1 = make$5(/* Some */[/* tuple */[
                    -5,
                    -5
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkL */1, pos$1, ctx);
            var p2 = make$5(/* Some */[/* tuple */[
                    -3,
                    -4
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkL */1, pos$1, ctx);
            var p3 = make$5(/* Some */[/* tuple */[
                    3,
                    -4
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkR */2, pos$1, ctx);
            var p4 = make$5(/* Some */[/* tuple */[
                    5,
                    -5
                  ]], /* Some */[/* tuple */[
                    0,
                    0.2
                  ]], /* BrickChunkR */2, pos$1, ctx);
            return /* :: */[
                    p1,
                    /* :: */[
                      p2,
                      /* :: */[
                        p3,
                        /* :: */[
                          p4,
                          /* [] */0
                        ]
                      ]
                    ]
                  ];
          }
        } else {
          return /* [] */0;
        }
        break;
    
  }
}

var invuln = 60;

var dampen_jump = 4;


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
function make$6(param, param$1) {
  return /* record */[
          /* pos : float array */[
            0,
            0
          ],
          /* v_dim : float array */[
            param[0],
            param[1]
          ],
          /* m_dim : float array */[
            param$1[0],
            param$1[1]
          ]
        ];
}

function calc_viewport_point(cc, vc, mc) {
  var vc_half = vc / 2;
  return min(max(cc - vc_half, 0), min(mc - vc, Math.abs(cc - vc_half)));
}

function in_viewport(v, pos) {
  var match_000 = v[/* pos */0][/* x */0] - 32;
  var match_001 = v[/* pos */0][/* x */0] + v[/* v_dim */1][/* x */0];
  var match_000$1 = v[/* pos */0][/* y */1] - 32;
  var match_001$1 = v[/* pos */0][/* y */1] + v[/* v_dim */1][/* y */1];
  var match_000$2 = pos[/* x */0];
  var match_001$2 = pos[/* y */1];
  var y = match_001$2;
  var x = match_000$2;
  if (x >= match_000 && x <= match_001 && y >= match_000$1) {
    return +(y <= match_001$1);
  } else {
    return /* false */0;
  }
}

function out_of_viewport_below(v, y) {
  var v_max_y = v[/* pos */0][/* y */1] + v[/* v_dim */1][/* y */1];
  return +(y >= v_max_y);
}

function coord_to_viewport(viewport, coord) {
  return /* float array */[
          coord[/* x */0] - viewport[/* pos */0][/* x */0],
          coord[/* y */1] - viewport[/* pos */0][/* y */1]
        ];
}

function update(vpt, ctr) {
  var new_x = calc_viewport_point(ctr[/* x */0], vpt[/* v_dim */1][/* x */0], vpt[/* m_dim */2][/* x */0]);
  var new_y = calc_viewport_point(ctr[/* y */1], vpt[/* v_dim */1][/* y */1], vpt[/* m_dim */2][/* y */1]);
  var pos = /* float array */[
    new_x,
    new_y
  ];
  return /* record */[
          /* pos */pos,
          /* v_dim */vpt[/* v_dim */1],
          /* m_dim */vpt[/* m_dim */2]
        ];
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
var pressed_keys = /* record */[
  /* left : false */0,
  /* right : false */0,
  /* up : false */0,
  /* down : false */0,
  /* bbox */0
];

var collid_objs = [/* [] */0];

var particles = [/* [] */0];

var last_time = [0];

function calc_fps(t0, t1) {
  var delta = (t1 - t0) / 1000;
  return 1 / delta;
}

function update_score(state, i) {
  state[/* score */4] = state[/* score */4] + i | 0;
  return /* () */0;
}

function process_collision(dir, c1, c2, state) {
  var context = state[/* ctx */1];
  var exit$$1 = 0;
  var s1;
  var o1;
  var typ;
  var s2;
  var o2;
  var s1$1;
  var o1$1;
  var t2;
  var s2$1;
  var o2$1;
  var o1$2;
  var t2$1;
  var o2$2;
  switch (c1.tag | 0) {
    case 0 : 
        var o1$3 = c1[2];
        var s1$2 = c1[1];
        switch (c2.tag | 0) {
          case 0 : 
              return /* tuple */[
                      /* None */0,
                      /* None */0
                    ];
          case 1 : 
              var o2$3 = c2[2];
              var s2$2 = c2[1];
              var typ$1 = c2[0];
              if (dir !== 1) {
                s1$1 = s1$2;
                o1$1 = o1$3;
                t2 = typ$1;
                s2$1 = s2$2;
                o2$1 = o2$3;
                exit$$1 = 2;
              } else {
                s1 = s1$2;
                o1 = o1$3;
                typ = typ$1;
                s2 = s2$2;
                o2 = o2$3;
                exit$$1 = 1;
              }
              break;
          case 2 : 
              o1$2 = o1$3;
              t2$1 = c2[0];
              o2$2 = c2[2];
              exit$$1 = 3;
              break;
          case 3 : 
              var o2$4 = c2[2];
              var t = c2[0];
              if (dir !== 0) {
                var exit$1 = 0;
                if (typeof t === "number") {
                  if (t !== 4) {
                    exit$1 = 4;
                  } else {
                    game_win(state[/* ctx */1]);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  }
                } else {
                  exit$1 = 4;
                }
                if (exit$1 === 4) {
                  if (dir !== 1) {
                    collide_block(/* None */0, dir, o1$3);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  } else {
                    state[/* multiplier */6] = 1;
                    collide_block(/* None */0, dir, o1$3);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  }
                }
                
              } else if (typeof t === "number") {
                if (t !== 1) {
                  if (t !== 4) {
                    collide_block(/* None */0, dir, o1$3);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  } else {
                    game_win(state[/* ctx */1]);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  }
                } else if (c1[0]) {
                  collide_block(/* None */0, dir, o1$3);
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                } else {
                  collide_block(/* None */0, dir, o1$3);
                  dec_health(o2$4);
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                }
              } else {
                var updated_block = evolve_block(o2$4, context);
                var spawned_item = spawn_above(o1$3[/* dir */6], o2$4, t[0], context);
                collide_block(/* None */0, dir, o1$3);
                return /* tuple */[
                        /* Some */[spawned_item],
                        /* Some */[updated_block]
                      ];
              }
              break;
          
        }
        break;
    case 1 : 
        var o1$4 = c1[2];
        var s1$3 = c1[1];
        var t1 = c1[0];
        switch (c2.tag | 0) {
          case 0 : 
              var o1$5 = c2[2];
              var s1$4 = c2[1];
              if (dir !== 0) {
                s1$1 = s1$4;
                o1$1 = o1$5;
                t2 = t1;
                s2$1 = s1$3;
                o2$1 = o1$4;
                exit$$1 = 2;
              } else {
                s1 = s1$4;
                o1 = o1$5;
                typ = t1;
                s2 = s1$3;
                o2 = o1$4;
                exit$$1 = 1;
              }
              break;
          case 1 : 
              var t1$1 = t1;
              var s1$5 = s1$3;
              var o1$6 = o1$4;
              var t2$2 = c2[0];
              var s2$3 = c2[1];
              var o2$5 = c2[2];
              var dir$1 = dir;
              var exit$2 = 0;
              if (t1$1 !== 3) {
                if (t1$1 >= 4) {
                  if (t2$2 >= 3) {
                    dec_health(o1$6);
                    dec_health(o2$5);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  } else {
                    exit$2 = 1;
                  }
                } else if (t2$2 >= 3) {
                  if (o2$5[/* vel */2][/* x */0] === 0) {
                    rev_dir(o1$6, t1$1, s1$5);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  } else {
                    dec_health(o1$6);
                    return /* tuple */[
                            /* None */0,
                            /* None */0
                          ];
                  }
                } else if (dir$1 >= 2) {
                  rev_dir(o1$6, t1$1, s1$5);
                  rev_dir(o2$5, t2$2, s2$3);
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                } else {
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                }
              } else if (t2$2 >= 3) {
                dec_health(o1$6);
                dec_health(o2$5);
                return /* tuple */[
                        /* None */0,
                        /* None */0
                      ];
              } else {
                exit$2 = 1;
              }
              if (exit$2 === 1) {
                if (o1$6[/* vel */2][/* x */0] === 0) {
                  rev_dir(o2$5, t2$2, s2$3);
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                } else {
                  dec_health(o2$5);
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                }
              }
              case 2 : 
              return /* tuple */[
                      /* None */0,
                      /* None */0
                    ];
          case 3 : 
              var o2$6 = c2[2];
              var t2$3 = c2[0];
              if (dir >= 2) {
                if (t1 >= 3) {
                  if (typeof t2$3 === "number") {
                    if (t2$3 !== 1) {
                      rev_dir(o1$4, t1, s1$3);
                      return /* tuple */[
                              /* None */0,
                              /* None */0
                            ];
                    } else {
                      dec_health(o2$6);
                      reverse_left_right(o1$4);
                      return /* tuple */[
                              /* None */0,
                              /* None */0
                            ];
                    }
                  } else {
                    var updated_block$1 = evolve_block(o2$6, context);
                    var spawned_item$1 = spawn_above(o1$4[/* dir */6], o2$6, t2$3[0], context);
                    rev_dir(o1$4, t1, s1$3);
                    return /* tuple */[
                            /* Some */[updated_block$1],
                            /* Some */[spawned_item$1]
                          ];
                  }
                } else {
                  rev_dir(o1$4, t1, s1$3);
                  return /* tuple */[
                          /* None */0,
                          /* None */0
                        ];
                }
              } else {
                collide_block(/* None */0, dir, o1$4);
                return /* tuple */[
                        /* None */0,
                        /* None */0
                      ];
              }
              break;
          
        }
        break;
    case 2 : 
        var o2$7 = c1[2];
        switch (c2.tag | 0) {
          case 0 : 
              o1$2 = c2[2];
              t2$1 = c1[0];
              o2$2 = o2$7;
              exit$$1 = 3;
              break;
          case 1 : 
          case 2 : 
              return /* tuple */[
                      /* None */0,
                      /* None */0
                    ];
          case 3 : 
              if (dir >= 2) {
                reverse_left_right(o2$7);
                return /* tuple */[
                        /* None */0,
                        /* None */0
                      ];
              } else {
                collide_block(/* None */0, dir, o2$7);
                return /* tuple */[
                        /* None */0,
                        /* None */0
                      ];
              }
          
        }
        break;
    case 3 : 
        return /* tuple */[
                /* None */0,
                /* None */0
              ];
    
  }
  switch (exit$$1) {
    case 1 : 
        var o1$7 = o1;
        var typ$2 = typ;
        var s2$4 = s2;
        var o2$8 = o2;
        var state$1 = state;
        var context$1 = context;
        o1$7[/* invuln */7] = 10;
        o1$7[/* jumping */4] = /* false */0;
        o1$7[/* grounded */5] = /* true */1;
        if (typ$2 >= 3) {
          var r2 = evolve_enemy(o1$7[/* dir */6], typ$2, s2$4, o2$8, context$1);
          o1$7[/* vel */2][/* y */1] = -dampen_jump;
          o1$7[/* pos */1][/* y */1] = o1$7[/* pos */1][/* y */1] - 5;
          return /* tuple */[
                  /* None */0,
                  r2
                ];
        } else {
          dec_health(o2$8);
          o1$7[/* vel */2][/* y */1] = -dampen_jump;
          if (state$1[/* multiplier */6] === 8) {
            update_score(state$1, 800);
            o2$8[/* score */11] = 800;
            return /* tuple */[
                    /* None */0,
                    evolve_enemy(o1$7[/* dir */6], typ$2, s2$4, o2$8, context$1)
                  ];
          } else {
            var score = imul(100, state$1[/* multiplier */6]);
            update_score(state$1, score);
            o2$8[/* score */11] = score;
            state$1[/* multiplier */6] = (state$1[/* multiplier */6] << 1);
            return /* tuple */[
                    /* None */0,
                    evolve_enemy(o1$7[/* dir */6], typ$2, s2$4, o2$8, context$1)
                  ];
          }
        }
    case 2 : 
        var o1$8 = o1$1;
        var t2$4 = t2;
        var s2$5 = s2$1;
        var o2$9 = o2$1;
        var context$2 = context;
        if (t2$4 >= 3) {
          var r2$1 = o2$9[/* vel */2][/* x */0] === 0 ? evolve_enemy(o1$8[/* dir */6], t2$4, s2$5, o2$9, context$2) : (dec_health(o1$8), o1$8[/* invuln */7] = invuln, /* None */0);
          return /* tuple */[
                  /* None */0,
                  r2$1
                ];
        } else {
          dec_health(o1$8);
          o1$8[/* invuln */7] = invuln;
          return /* tuple */[
                  /* None */0,
                  /* None */0
                ];
        }
    case 3 : 
        if (t2$1 !== 0) {
          if (t2$1 >= 3) {
            state[/* coins */5] = state[/* coins */5] + 1 | 0;
            dec_health(o2$2);
            update_score(state, 100);
            return /* tuple */[
                    /* None */0,
                    /* None */0
                  ];
          } else {
            dec_health(o2$2);
            update_score(state, 1000);
            return /* tuple */[
                    /* None */0,
                    /* None */0
                  ];
          }
        } else {
          dec_health(o2$2);
          if (o1$2[/* health */9] !== 2) {
            o1$2[/* health */9] = o1$2[/* health */9] + 1 | 0;
          }
          o1$2[/* vel */2][/* x */0] = 0;
          o1$2[/* vel */2][/* y */1] = 0;
          update_score(state, 1000);
          o2$2[/* score */11] = 1000;
          return /* tuple */[
                  /* None */0,
                  /* None */0
                ];
        }
        break;
    
  }
}

function broad_phase(collid, all_collids, state) {
  var obj = get_obj(collid);
  return filter((function () {
                  if (in_viewport(state[/* vpt */2], obj[/* pos */1]) || is_player(collid)) {
                    return /* true */1;
                  } else {
                    return out_of_viewport_below(state[/* vpt */2], obj[/* pos */1][/* y */1]);
                  }
                }))(all_collids);
}

function check_collisions(collid, all_collids, state) {
  if (collid.tag === 3) {
    return /* [] */0;
  } else {
    var broad = broad_phase(collid, all_collids, state);
    var c = collid;
    var cs = broad;
    var state$1 = state;
    var c$1 = c;
    var _cs = cs;
    var state$2 = state$1;
    var _acc = /* [] */0;
    while(true) {
      var acc = _acc;
      var cs$1 = _cs;
      if (cs$1) {
        var h = cs$1[0];
        var c_obj = get_obj(c$1);
        var new_objs;
        if (equals(c$1, h)) {
          new_objs = /* tuple */[
            /* None */0,
            /* None */0
          ];
        } else {
          var match = check_collision(c$1, h);
          new_objs = match ? (
              get_obj(h)[/* id */3] !== c_obj[/* id */3] ? process_collision(match[0], c$1, h, state$2) : /* tuple */[
                  /* None */0,
                  /* None */0
                ]
            ) : /* tuple */[
              /* None */0,
              /* None */0
            ];
        }
        var match$1 = new_objs[0];
        var acc$1;
        if (match$1) {
          var match$2 = new_objs[1];
          var o = match$1[0];
          acc$1 = match$2 ? /* :: */[
              o,
              /* :: */[
                match$2[0],
                acc
              ]
            ] : /* :: */[
              o,
              acc
            ];
        } else {
          var match$3 = new_objs[1];
          acc$1 = match$3 ? /* :: */[
              match$3[0],
              acc
            ] : acc;
        }
        _acc = acc$1;
        _cs = cs$1[1];
        continue ;
        
      } else {
        return acc;
      }
    }
  }
}

function update_collidable(state, collid, all_collids) {
  var obj = get_obj(collid);
  var spr = get_sprite(collid);
  obj[/* invuln */7] = obj[/* invuln */7] > 0 ? obj[/* invuln */7] - 1 | 0 : 0;
  var viewport_filter = in_viewport(state[/* vpt */2], obj[/* pos */1]) || is_player(collid) || out_of_viewport_below(state[/* vpt */2], obj[/* pos */1][/* y */1]);
  if (!obj[/* kill */8] && viewport_filter) {
    obj[/* grounded */5] = /* false */0;
    process_obj(obj, state[/* map */3]);
    var evolved = check_collisions(collid, all_collids, state);
    var vpt_adj_xy = coord_to_viewport(state[/* vpt */2], obj[/* pos */1]);
    render(spr, /* tuple */[
          vpt_adj_xy[/* x */0],
          vpt_adj_xy[/* y */1]
        ]);
    if (pressed_keys[/* bbox */4] === 1) {
      render_bbox(spr, /* tuple */[
            vpt_adj_xy[/* x */0],
            vpt_adj_xy[/* y */1]
          ]);
    }
    if (obj[/* vel */2][/* x */0] !== 0 || !is_enemy(collid)) {
      update_animation(spr);
    }
    return evolved;
  } else {
    return /* [] */0;
  }
}

function translate_keys() {
  var ctrls_000 = /* tuple */[
    pressed_keys[/* left */0],
    /* CLeft */0
  ];
  var ctrls_001 = /* :: */[
    /* tuple */[
      pressed_keys[/* right */1],
      /* CRight */1
    ],
    /* :: */[
      /* tuple */[
        pressed_keys[/* up */2],
        /* CUp */2
      ],
      /* :: */[
        /* tuple */[
          pressed_keys[/* down */3],
          /* CDown */3
        ],
        /* [] */0
      ]
    ]
  ];
  var ctrls = /* :: */[
    ctrls_000,
    ctrls_001
  ];
  return fold_left((function (a, x) {
                if (x[0]) {
                  return /* :: */[
                          x[1],
                          a
                        ];
                } else {
                  return a;
                }
              }), /* [] */0, ctrls);
}

function run_update_collid(state, collid, all_collids) {
  if (collid.tag) {
    var obj = get_obj(collid);
    var evolved = update_collidable(state, collid, all_collids);
    if (!obj[/* kill */8]) {
      collid_objs[0] = /* :: */[
        collid,
        $at(collid_objs[0], evolved)
      ];
    }
    var new_parts = obj[/* kill */8] ? kill(collid, state[/* ctx */1]) : /* [] */0;
    particles[0] = $at(particles[0], new_parts);
    return collid;
  } else {
    var o = collid[2];
    var keys = translate_keys(/* () */0);
    o[/* crouch */10] = /* false */0;
    var match = update_player(o, keys, state[/* ctx */1]);
    var player;
    if (match) {
      var match$1 = match[0];
      var new_spr = match$1[1];
      normalize_pos(o[/* pos */1], collid[1][/* params */0], new_spr[/* params */0]);
      player = /* Player */__(0, [
          match$1[0],
          new_spr,
          o
        ]);
    } else {
      player = collid;
    }
    var evolved$1 = update_collidable(state, player, all_collids);
    collid_objs[0] = $at(collid_objs[0], evolved$1);
    return player;
  }
}

function update_loop(canvas, param, map_dim) {
  var player = param[0];
  var ctx = canvas.getContext("2d");
  var cwidth = canvas.width / 1;
  var cheight = canvas.height / 1;
  var viewport = make$6(/* tuple */[
        cwidth,
        cheight
      ], map_dim);
  var state = /* record */[
    /* bgd */make_bgd(ctx),
    /* ctx */ctx,
    /* vpt */update(viewport, get_obj(player)[/* pos */1]),
    /* map */map_dim[1],
    /* score */0,
    /* coins */0,
    /* multiplier */1,
    /* game_over : false */0
  ];
  state[/* ctx */1].scale(1, 1);
  var update_helper = function (time, state, player, objs, parts) {
    if (state[/* game_over */7] === /* true */1) {
      return game_win(state[/* ctx */1]);
    } else {
      collid_objs[0] = /* [] */0;
      particles[0] = /* [] */0;
      var fps$$1 = calc_fps(last_time[0], time);
      last_time[0] = time;
      clear_canvas(canvas);
      var vpos_x_int = state[/* vpt */2][/* pos */0][/* x */0] / 5 | 0;
      var bgd_width = state[/* bgd */0][/* params */0][/* frame_size */3][0] | 0;
      draw_bgd(state[/* bgd */0], mod_(vpos_x_int, bgd_width));
      var player$1 = run_update_collid(state, player, objs);
      if (get_obj(player$1)[/* kill */8] === /* true */1) {
        return game_loss(state[/* ctx */1]);
      } else {
        var newrecord = state.slice();
        newrecord[/* vpt */2] = update(state[/* vpt */2], get_obj(player$1)[/* pos */1]);
        iter((function (obj) {
                run_update_collid(newrecord, obj, objs);
                return /* () */0;
              }), objs);
        iter((function (part) {
                var state = newrecord;
                var part$1 = part;
                $$process(part$1);
                var x = part$1[/* pos */2][/* x */0] - state[/* vpt */2][/* pos */0][/* x */0];
                var y = part$1[/* pos */2][/* y */1] - state[/* vpt */2][/* pos */0][/* y */1];
                render(part$1[/* params */0][/* sprite */0], /* tuple */[
                      x,
                      y
                    ]);
                if (part$1[/* kill */5]) {
                  return 0;
                } else {
                  particles[0] = /* :: */[
                    part$1,
                    particles[0]
                  ];
                  return /* () */0;
                }
              }), parts);
        fps(canvas, fps$$1);
        hud(canvas, newrecord[/* score */4], newrecord[/* coins */5]);
        requestAnimationFrame((function (t) {
                return update_helper(t, newrecord, player$1, collid_objs[0], particles[0]);
              }));
        return /* () */0;
      }
    }
  };
  return update_helper(0, state, player, param[1], /* [] */0);
}

function keydown(evt) {
  var match = evt.keyCode;
  if (match >= 41) {
    var switcher = match - 65 | 0;
    if (!(switcher > 22 || switcher < 0)) {
      switch (switcher) {
        case 0 : 
            pressed_keys[/* left */0] = /* true */1;
            break;
        case 1 : 
            pressed_keys[/* bbox */4] = (pressed_keys[/* bbox */4] + 1 | 0) % 2;
            break;
        case 3 : 
            pressed_keys[/* right */1] = /* true */1;
            break;
        case 18 : 
            pressed_keys[/* down */3] = /* true */1;
            break;
        case 2 : 
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 10 : 
        case 11 : 
        case 12 : 
        case 13 : 
        case 14 : 
        case 15 : 
        case 16 : 
        case 17 : 
        case 19 : 
        case 20 : 
        case 21 : 
            break;
        case 22 : 
            pressed_keys[/* up */2] = /* true */1;
            break;
        
      }
    }
    
  } else if (match >= 32) {
    switch (match - 32 | 0) {
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
          break;
      case 5 : 
          pressed_keys[/* left */0] = /* true */1;
          break;
      case 0 : 
      case 6 : 
          pressed_keys[/* up */2] = /* true */1;
          break;
      case 7 : 
          pressed_keys[/* right */1] = /* true */1;
          break;
      case 8 : 
          pressed_keys[/* down */3] = /* true */1;
          break;
      
    }
  }
  return true;
}

function keyup(evt) {
  var match = evt.keyCode;
  if (match >= 68) {
    if (match !== 83) {
      if (match !== 87) {
        if (match >= 69) {
          
        } else {
          pressed_keys[/* right */1] = /* false */0;
        }
      } else {
        pressed_keys[/* up */2] = /* false */0;
      }
    } else {
      pressed_keys[/* down */3] = /* false */0;
    }
  } else if (match >= 41) {
    if (match === 65) {
      pressed_keys[/* left */0] = /* false */0;
    }
    
  } else if (match >= 32) {
    switch (match - 32 | 0) {
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
          break;
      case 5 : 
          pressed_keys[/* left */0] = /* false */0;
          break;
      case 0 : 
      case 6 : 
          pressed_keys[/* up */2] = /* false */0;
          break;
      case 7 : 
          pressed_keys[/* right */1] = /* false */0;
          break;
      case 8 : 
          pressed_keys[/* down */3] = /* false */0;
          break;
      
    }
  }
  return true;
}


/* Draw Not a pure module */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
function mem_loc(checkloc, _loclist) {
  while(true) {
    var loclist = _loclist;
    if (loclist) {
      if (caml_equal(checkloc, loclist[0][1])) {
        return /* true */1;
      } else {
        _loclist = loclist[1];
        continue ;
        
      }
    } else {
      return /* false */0;
    }
  }
}

function convert_list(lst) {
  if (lst) {
    var h = lst[0];
    return $at(/* :: */[
                /* tuple */[
                  h[0],
                  /* tuple */[
                    h[1][0] * 16,
                    h[1][1] * 16
                  ]
                ],
                /* [] */0
              ], convert_list(lst[1]));
  } else {
    return /* [] */0;
  }
}

function choose_enemy_typ(typ) {
  if (typ > 2 || typ < 0) {
    return failwith("Shouldn't reach here");
  } else {
    switch (typ) {
      case 0 : 
          return /* RKoopa */2;
      case 1 : 
          return /* GKoopa */1;
      case 2 : 
          return /* Goomba */0;
      
    }
  }
}

function choose_sblock_typ(typ) {
  if (typ > 4 || typ < 0) {
    return failwith("Shouldn't reach here");
  } else {
    switch (typ) {
      case 0 : 
          return /* Brick */1;
      case 1 : 
          return /* UnBBlock */2;
      case 2 : 
          return /* Cloud */3;
      case 3 : 
          return /* QBlock */[/* Mushroom */0];
      case 4 : 
          return /* Ground */5;
      
    }
  }
}

function avoid_overlap(_lst, currentLst) {
  while(true) {
    var lst = _lst;
    if (lst) {
      var t = lst[1];
      var h = lst[0];
      if (mem_loc(h[1], currentLst)) {
        _lst = t;
        continue ;
        
      } else {
        return $at(/* :: */[
                    h,
                    /* [] */0
                  ], avoid_overlap(t, currentLst));
      }
    } else {
      return /* [] */0;
    }
  }
}

function trim_edges(_lst, blockw, blockh) {
  while(true) {
    var lst = _lst;
    if (lst) {
      var t = lst[1];
      var h = lst[0];
      var cx = h[1][0];
      var cy = h[1][1];
      var pixx = blockw * 16;
      var pixy = blockh * 16;
      if (cx < 128 || pixx - cx < 528 || cy === 0 || pixy - cy < 48) {
        _lst = t;
        continue ;
        
      } else {
        return $at(/* :: */[
                    h,
                    /* [] */0
                  ], trim_edges(t, blockw, blockh));
      }
    } else {
      return /* [] */0;
    }
  }
}

function generate_clouds(cbx, cby, typ, num) {
  if (num) {
    return $at(/* :: */[
                /* tuple */[
                  typ,
                  /* tuple */[
                    cbx,
                    cby
                  ]
                ],
                /* [] */0
              ], generate_clouds(cbx + 1, cby, typ, num - 1 | 0));
  } else {
    return /* [] */0;
  }
}

function generate_coins(_block_coord) {
  while(true) {
    var block_coord = _block_coord;
    var place_coin = $$int$1(2);
    if (block_coord) {
      var t = block_coord[1];
      var h = block_coord[0];
      if (place_coin) {
        _block_coord = t;
        continue ;
        
      } else {
        var xc = h[1][0];
        var yc = h[1][1];
        return $at(/* :: */[
                    /* tuple */[
                      0,
                      /* tuple */[
                        xc,
                        yc - 16
                      ]
                    ],
                    /* [] */0
                  ], generate_coins(t));
      }
    } else {
      return /* [] */0;
    }
  }
}

function choose_block_pattern(blockw, blockh, cbx, cby, prob) {
  if (cbx > blockw || cby > blockh) {
    return /* [] */0;
  } else {
    var block_typ = $$int$1(4);
    var stair_typ = $$int$1(2);
    var life_block_chance = $$int$1(5);
    var middle_block = life_block_chance ? stair_typ : 3;
    if (prob > 5 || prob < 0) {
      return failwith("Shouldn't reach here");
    } else {
      switch (prob) {
        case 0 : 
            if (blockw - cbx > 2) {
              return /* :: */[
                      /* tuple */[
                        stair_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* :: */[
                        /* tuple */[
                          middle_block,
                          /* tuple */[
                            cbx + 1,
                            cby
                          ]
                        ],
                        /* :: */[
                          /* tuple */[
                            stair_typ,
                            /* tuple */[
                              cbx + 2,
                              cby
                            ]
                          ],
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (blockw - cbx > 1) {
              return /* :: */[
                      /* tuple */[
                        block_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* :: */[
                        /* tuple */[
                          block_typ,
                          /* tuple */[
                            cbx + 1,
                            cby
                          ]
                        ],
                        /* [] */0
                      ]
                    ];
            } else {
              return /* :: */[
                      /* tuple */[
                        block_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* [] */0
                    ];
            }
        case 1 : 
            var num_clouds = $$int$1(5) + 5 | 0;
            if (cby < 5) {
              return generate_clouds(cbx, cby, 2, num_clouds);
            } else {
              return /* [] */0;
            }
        case 2 : 
            if (blockh - cby === 1) {
              var cbx$1 = cbx;
              var cby$1 = cby;
              var typ = stair_typ;
              var four_000 = /* tuple */[
                typ,
                /* tuple */[
                  cbx$1,
                  cby$1
                ]
              ];
              var four_001 = /* :: */[
                /* tuple */[
                  typ,
                  /* tuple */[
                    cbx$1 + 1,
                    cby$1
                  ]
                ],
                /* :: */[
                  /* tuple */[
                    typ,
                    /* tuple */[
                      cbx$1 + 2,
                      cby$1
                    ]
                  ],
                  /* :: */[
                    /* tuple */[
                      typ,
                      /* tuple */[
                        cbx$1 + 3,
                        cby$1
                      ]
                    ],
                    /* [] */0
                  ]
                ]
              ];
              var four = /* :: */[
                four_000,
                four_001
              ];
              var three_000 = /* tuple */[
                typ,
                /* tuple */[
                  cbx$1 + 1,
                  cby$1 - 1
                ]
              ];
              var three_001 = /* :: */[
                /* tuple */[
                  typ,
                  /* tuple */[
                    cbx$1 + 2,
                    cby$1 - 1
                  ]
                ],
                /* :: */[
                  /* tuple */[
                    typ,
                    /* tuple */[
                      cbx$1 + 3,
                      cby$1 - 1
                    ]
                  ],
                  /* [] */0
                ]
              ];
              var three = /* :: */[
                three_000,
                three_001
              ];
              var two_000 = /* tuple */[
                typ,
                /* tuple */[
                  cbx$1 + 2,
                  cby$1 - 2
                ]
              ];
              var two_001 = /* :: */[
                /* tuple */[
                  typ,
                  /* tuple */[
                    cbx$1 + 3,
                    cby$1 - 2
                  ]
                ],
                /* [] */0
              ];
              var two = /* :: */[
                two_000,
                two_001
              ];
              var one_000 = /* tuple */[
                typ,
                /* tuple */[
                  cbx$1 + 3,
                  cby$1 - 3
                ]
              ];
              var one = /* :: */[
                one_000,
                /* [] */0
              ];
              return $at(four, $at(three, $at(two, one)));
            } else {
              return /* [] */0;
            }
        case 3 : 
            if (stair_typ === 0 && blockh - cby > 3) {
              var cbx$2 = cbx;
              var cby$2 = cby;
              var typ$1 = stair_typ;
              var three_000$1 = /* tuple */[
                typ$1,
                /* tuple */[
                  cbx$2,
                  cby$2
                ]
              ];
              var three_001$1 = /* :: */[
                /* tuple */[
                  typ$1,
                  /* tuple */[
                    cbx$2 + 1,
                    cby$2
                  ]
                ],
                /* :: */[
                  /* tuple */[
                    typ$1,
                    /* tuple */[
                      cbx$2 + 2,
                      cby$2
                    ]
                  ],
                  /* [] */0
                ]
              ];
              var three$1 = /* :: */[
                three_000$1,
                three_001$1
              ];
              var two_000$1 = /* tuple */[
                typ$1,
                /* tuple */[
                  cbx$2 + 2,
                  cby$2 + 1
                ]
              ];
              var two_001$1 = /* :: */[
                /* tuple */[
                  typ$1,
                  /* tuple */[
                    cbx$2 + 3,
                    cby$2 + 1
                  ]
                ],
                /* [] */0
              ];
              var two$1 = /* :: */[
                two_000$1,
                two_001$1
              ];
              var one_000$1 = /* tuple */[
                typ$1,
                /* tuple */[
                  cbx$2 + 5,
                  cby$2 + 2
                ]
              ];
              var one_001 = /* :: */[
                /* tuple */[
                  typ$1,
                  /* tuple */[
                    cbx$2 + 6,
                    cby$2 + 2
                  ]
                ],
                /* [] */0
              ];
              var one$1 = /* :: */[
                one_000$1,
                one_001
              ];
              return $at(three$1, $at(two$1, one$1));
            } else if (blockh - cby > 2) {
              var cbx$3 = cbx;
              var cby$3 = cby;
              var typ$2 = stair_typ;
              var one_000$2 = /* tuple */[
                typ$2,
                /* tuple */[
                  cbx$3,
                  cby$3
                ]
              ];
              var one_001$1 = /* :: */[
                /* tuple */[
                  typ$2,
                  /* tuple */[
                    cbx$3 + 1,
                    cby$3
                  ]
                ],
                /* [] */0
              ];
              var one$2 = /* :: */[
                one_000$2,
                one_001$1
              ];
              var two_000$2 = /* tuple */[
                typ$2,
                /* tuple */[
                  cbx$3 + 3,
                  cby$3 - 1
                ]
              ];
              var two_001$2 = /* :: */[
                /* tuple */[
                  typ$2,
                  /* tuple */[
                    cbx$3 + 4,
                    cby$3 - 1
                  ]
                ],
                /* [] */0
              ];
              var two$2 = /* :: */[
                two_000$2,
                two_001$2
              ];
              var three_000$2 = /* tuple */[
                typ$2,
                /* tuple */[
                  cbx$3 + 4,
                  cby$3 - 2
                ]
              ];
              var three_001$2 = /* :: */[
                /* tuple */[
                  typ$2,
                  /* tuple */[
                    cbx$3 + 5,
                    cby$3 - 2
                  ]
                ],
                /* :: */[
                  /* tuple */[
                    typ$2,
                    /* tuple */[
                      cbx$3 + 6,
                      cby$3 - 2
                    ]
                  ],
                  /* [] */0
                ]
              ];
              var three$2 = /* :: */[
                three_000$2,
                three_001$2
              ];
              return $at(one$2, $at(two$2, three$2));
            } else {
              return /* :: */[
                      /* tuple */[
                        stair_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* [] */0
                    ];
            }
        case 4 : 
            if (cby + 3 - blockh === 2) {
              return /* :: */[
                      /* tuple */[
                        stair_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* [] */0
                    ];
            } else if (cby + 3 - blockh === 1) {
              return /* :: */[
                      /* tuple */[
                        stair_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* :: */[
                        /* tuple */[
                          stair_typ,
                          /* tuple */[
                            cbx,
                            cby + 1
                          ]
                        ],
                        /* [] */0
                      ]
                    ];
            } else {
              return /* :: */[
                      /* tuple */[
                        stair_typ,
                        /* tuple */[
                          cbx,
                          cby
                        ]
                      ],
                      /* :: */[
                        /* tuple */[
                          stair_typ,
                          /* tuple */[
                            cbx,
                            cby + 1
                          ]
                        ],
                        /* :: */[
                          /* tuple */[
                            stair_typ,
                            /* tuple */[
                              cbx,
                              cby + 2
                            ]
                          ],
                          /* [] */0
                        ]
                      ]
                    ];
            }
        case 5 : 
            return /* :: */[
                    /* tuple */[
                      3,
                      /* tuple */[
                        cbx,
                        cby
                      ]
                    ],
                    /* [] */0
                  ];
        
      }
    }
  }
}

function generate_enemies(blockw, blockh, _cbx, _cby, acc) {
  while(true) {
    var cby = _cby;
    var cbx = _cbx;
    if (cbx > blockw - 32) {
      return /* [] */0;
    } else if (cby > blockh - 1 || cbx < 15) {
      _cby = 0;
      _cbx = cbx + 1;
      continue ;
      
    } else if (mem_loc(/* tuple */[
            cbx,
            cby
          ], acc) || cby === 0) {
      _cby = cby + 1;
      continue ;
      
    } else {
      var prob = $$int$1(30);
      if (prob < 3 && blockh - 1 === cby) {
        var enemy_000 = /* tuple */[
          prob,
          /* tuple */[
            cbx * 16,
            cby * 16
          ]
        ];
        var enemy = /* :: */[
          enemy_000,
          /* [] */0
        ];
        return $at(enemy, generate_enemies(blockw, blockh, cbx, cby + 1, acc));
      } else {
        _cby = cby + 1;
        continue ;
        
      }
    }
  }
}

function generate_block_enemies(_block_coord) {
  while(true) {
    var block_coord = _block_coord;
    var place_enemy = $$int$1(20);
    var enemy_typ = $$int$1(3);
    if (block_coord) {
      var t = block_coord[1];
      var h = block_coord[0];
      if (place_enemy) {
        _block_coord = t;
        continue ;
        
      } else {
        var xc = h[1][0];
        var yc = h[1][1];
        return $at(/* :: */[
                    /* tuple */[
                      enemy_typ,
                      /* tuple */[
                        xc,
                        yc - 16
                      ]
                    ],
                    /* [] */0
                  ], generate_block_enemies(t));
      }
    } else {
      return /* [] */0;
    }
  }
}

function generate_block_locs(blockw, blockh, _cbx, _cby, _acc) {
  while(true) {
    var acc = _acc;
    var cby = _cby;
    var cbx = _cbx;
    if (blockw - cbx < 33) {
      return acc;
    } else if (cby > blockh - 1) {
      _cby = 0;
      _cbx = cbx + 1;
      continue ;
      
    } else if (mem_loc(/* tuple */[
            cbx,
            cby
          ], acc) || cby === 0) {
      _cby = cby + 1;
      continue ;
      
    } else {
      var prob = $$int$1(100);
      if (prob < 5) {
        var newacc = choose_block_pattern(blockw, blockh, cbx, cby, prob);
        var undup_lst = avoid_overlap(newacc, acc);
        var called_acc = $at(acc, undup_lst);
        _acc = called_acc;
        _cby = cby + 1;
        continue ;
        
      } else {
        _cby = cby + 1;
        continue ;
        
      }
    }
  }
}

function generate_panel(context, blockw, blockh) {
  return spawn(/* SBlock */__(3, [/* Panel */4]), context, /* tuple */[
              blockw * 16 - 256,
              blockh * 16 * 2 / 3
            ]);
}

function generate_ground(blockw, blockh, _inc, _acc) {
  while(true) {
    var acc = _acc;
    var inc = _inc;
    if (inc > blockw) {
      return acc;
    } else if (inc > 10) {
      var skip = $$int$1(10);
      var newacc = $at(acc, /* :: */[
            /* tuple */[
              4,
              /* tuple */[
                inc * 16,
                blockh * 16
              ]
            ],
            /* [] */0
          ]);
      if (skip === 7 && blockw - inc > 32) {
        _inc = inc + 1;
        continue ;
        
      } else {
        _acc = newacc;
        _inc = inc + 1;
        continue ;
        
      }
    } else {
      var newacc$1 = $at(acc, /* :: */[
            /* tuple */[
              4,
              /* tuple */[
                inc * 16,
                blockh * 16
              ]
            ],
            /* [] */0
          ]);
      _acc = newacc$1;
      _inc = inc + 1;
      continue ;
      
    }
  }
}

function convert_to_block_obj(lst, context) {
  if (lst) {
    var h = lst[0];
    var sblock_typ = choose_sblock_typ(h[0]);
    var ob = spawn(/* SBlock */__(3, [sblock_typ]), context, h[1]);
    return $at(/* :: */[
                ob,
                /* [] */0
              ], convert_to_block_obj(lst[1], context));
  } else {
    return /* [] */0;
  }
}

function convert_to_enemy_obj(lst, context) {
  if (lst) {
    var h = lst[0];
    var senemy_typ = choose_enemy_typ(h[0]);
    var ob = spawn(/* SEnemy */__(1, [senemy_typ]), context, h[1]);
    return $at(/* :: */[
                ob,
                /* [] */0
              ], convert_to_enemy_obj(lst[1], context));
  } else {
    return /* [] */0;
  }
}

function convert_to_coin_obj(lst, context) {
  if (lst) {
    var ob = spawn(/* SItem */__(2, [/* Coin */3]), context, lst[0][1]);
    return $at(/* :: */[
                ob,
                /* [] */0
              ], convert_to_coin_obj(lst[1], context));
  } else {
    return /* [] */0;
  }
}

function generate_helper(blockw, blockh, _, _$1, context) {
  var block_locs = generate_block_locs(blockw, blockh, 0, 0, /* [] */0);
  var converted_block_locs = trim_edges(convert_list(block_locs), blockw, blockh);
  var obj_converted_block_locs = convert_to_block_obj(converted_block_locs, context);
  var ground_blocks = generate_ground(blockw, blockh, 0, /* [] */0);
  var obj_converted_ground_blocks = convert_to_block_obj(ground_blocks, context);
  var block_locations = $at(block_locs, ground_blocks);
  var all_blocks = $at(obj_converted_block_locs, obj_converted_ground_blocks);
  var enemy_locs = generate_enemies(blockw, blockh, 0, 0, block_locations);
  var obj_converted_enemies = convert_to_enemy_obj(enemy_locs, context);
  var coin_locs = generate_coins(converted_block_locs);
  var undup_coin_locs = trim_edges(avoid_overlap(coin_locs, converted_block_locs), blockw, blockh);
  var converted_block_coin_locs = $at(converted_block_locs, coin_locs);
  var enemy_block_locs = generate_block_enemies(converted_block_locs);
  var undup_enemy_block_locs = avoid_overlap(enemy_block_locs, converted_block_coin_locs);
  var obj_enemy_blocks = convert_to_enemy_obj(undup_enemy_block_locs, context);
  var coin_objects = convert_to_coin_obj(undup_coin_locs, context);
  var obj_panel = generate_panel(context, blockw, blockh);
  return $at(all_blocks, $at(obj_converted_enemies, $at(coin_objects, $at(obj_enemy_blocks, /* :: */[
                          obj_panel,
                          /* [] */0
                        ]))));
}

function generate(w, h, context) {
  var blockw = w / 16;
  var blockh = h / 16 - 1;
  var collide_list = generate_helper(blockw, blockh, 0, 0, context);
  var player = spawn(/* SPlayer */__(0, [
          /* SmallM */1,
          /* Standing */0
        ]), context, /* tuple */[
        100,
        224
      ]);
  return /* tuple */[
          player,
          collide_list
        ];
}

function init$4() {
  return self_init(/* () */0);
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 1.7.5, PLEASE EDIT WITH CARE
var loadCount = [0];

function inc_counter() {
  loadCount[0] = loadCount[0] + 1 | 0;
  if (loadCount[0] === 4) {
    self_init(/* () */0);
    var canvas_id = "canvas";
    var match = document.getElementById(canvas_id);
    var canvas = match !== null ? match : (_1(printf(/* Format */[
                  /* String_literal */__(11, [
                      "cant find canvas ",
                      /* String */__(2, [
                          /* No_padding */0,
                          /* String_literal */__(11, [
                              " \n",
                              /* End_of_format */0
                            ])
                        ])
                    ]),
                  "cant find canvas %s \n"
                ]), canvas_id), failwith("fail"));
    var context = canvas.getContext("2d");
    document.addEventListener("keydown", keydown, true);
    document.addEventListener("keyup", keyup, true);
    init$4(/* () */0);
    update_loop(canvas, generate(2400, 256, context), /* tuple */[
          2400,
          256
        ]);
    console.log("asd");
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function preload() {
  return map((function (img_src) {
                var img_src$1 = "sprites/" + img_src;
                var img = document.createElement("img");
                img.src = img_src$1;
                img.addEventListener("load", (function () {
                        inc_counter(/* () */0);
                        return true;
                      }), true);
                return /* () */0;
              }), /* :: */[
              "blocks.png",
              /* :: */[
                "items.png",
                /* :: */[
                  "enemies.png",
                  /* :: */[
                    "mario-small.png",
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

window.onload = (function () {
    preload(/* () */0);
    return true;
  });


/*  Not a pure module */

}());
