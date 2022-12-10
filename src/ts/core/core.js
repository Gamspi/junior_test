"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
// constants
var ERROR_MASSAGES = 'Не предвиденная ошибка';
var API_URL = 'http://localhost:5000/api';
var LOG_OUT = 'Log out';
var SUBMIT_MASSAGES = 'submit';
// enums
var StorageItemEnums;
(function (StorageItemEnums) {
  StorageItemEnums["AUTH"] = "auth";
})(StorageItemEnums || (StorageItemEnums = {}));
var StatusEnums;
(function (StatusEnums) {
  StatusEnums["SUCCESS"] = "success";
  StatusEnums["ERROR"] = "error";
})(StatusEnums || (StatusEnums = {}));
var StyleEnums;
(function (StyleEnums) {
  StyleEnums["SCROLL"] = "scroll";
  StyleEnums["HIDDEN"] = "hidden";
})(StyleEnums || (StyleEnums = {}));
var ClassEnums;
(function (ClassEnums) {
  ClassEnums["PLAY"] = "_play";
  ClassEnums["CLICK"] = "_click";
  ClassEnums["ACTIVE"] = "_active";
  ClassEnums["OPEN"] = "_open";
  ClassEnums["VISIBLE"] = "_visible";
  ClassEnums["ERROR"] = "_error";
})(ClassEnums || (ClassEnums = {}));
var Xhr = /** @class */ (function () {
  function Xhr() {
  }
  Xhr.Get = function (URL, param) {
    return __awaiter(this, void 0, void 0, function () {
      var url;
      return __generator(this, function (_a) {
        this.URL = URL;
        url = !param ? this.URL : this.URL + "?" + this.getOptions(param);
        return [2 /*return*/, this.send('GET', url)];
      });
    });
  };
  Xhr.Post = function (URL, postObj) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.URL = URL;
        return [2 /*return*/, this.send('POST', this.URL, postObj)];
      });
    });
  };
  Xhr.send = function (method, url, postObj) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.xhr = new XMLHttpRequest();
      _this.xhr.open(method, url);
      _this.xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      _this.xhr.responseType = 'json';
      _this.xhr.onload = function () {
        if (_this.xhr.status < 400) {
          resolve(_this.xhr.response);
        }
        else {
          reject(_this.xhr.response);
        }
      };
      _this.xhr.onerror = function () {
        reject(_this.xhr.response);
      };
      _this.xhr.send(JSON.stringify(postObj));
    });
  };
  Xhr.getOptions = function (obj) {
    return Object.entries(obj).map(function (item) {
      return item.join('=');
    }).join('&');
  };
  Xhr.URL = '';
  return Xhr;
}());
// работа с аудио звуками
var DownloadSoundFile = /** @class */ (function () {
  function DownloadSoundFile(button) {
    this.button = button;
    this.id = button.dataset.id;
  }
  DownloadSoundFile.prototype.init = function () {
    var _this = this;
    this.button.onclick = function () {
      if (_this.id) {
        _this.button.disabled = true;
        _this.downloadFile().catch(function (e) { return console.error('Не предвиденная ошибка', e); }).finally(function () {
          _this.button.disabled = true;
        });
      }
    };
  };
  DownloadSoundFile.prototype.downloadFile = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response, blob, downloadUrl, link;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0: return [4 /*yield*/, fetch(API_URL + "/download/download?id=" + this.id)];
          case 1:
            response = _a.sent();
            if (!(response.status === 200)) return [3 /*break*/, 3];
            return [4 /*yield*/, response.blob()];
          case 2:
            blob = _a.sent();
            downloadUrl = window.URL.createObjectURL(blob);
            link = document.createElement('a');
            link.href = downloadUrl;
            link.download = "sound-" + this.id + ".mp3";
            document.body.appendChild(link);
            link.click();
            link.remove();
            _a.label = 3;
          case 3: return [2 /*return*/];
        }
      });
    });
  };
  return DownloadSoundFile;
}());
var LikeController = /** @class */ (function () {
  function LikeController(btn) {
    this.btn = btn;
    this.id = this.btn.dataset.id || '';
    this.defaultChecked = this.btn.defaultChecked;
    this.userId = sessionStorage.getItem(StorageItemEnums.AUTH);
  }
  LikeController.prototype.init = function () {
    var _this = this;
    this.btn.oninput = function (e) {
      var target = e.target;
      target.checked = _this.defaultChecked;
      _this.btn.disabled = true;
      Xhr.Post(API_URL + "/like/like", {
        id: _this.id,
        user: _this.userId
      }).then(function (response) {
        if (response) {
          var data = response.data;
          if (data) {
            target.checked = _this.defaultChecked = data.isLike;
          }
        }
      }).catch(function (e) { return console.error(e); }).finally(function () {
        _this.btn.disabled = false;
      });
    };
  };
  return LikeController;
}());
var SoundItemGeneration = /** @class */ (function () {
  function SoundItemGeneration(container) {
    this.container = container;
    this.itemInit = function () {
      document.querySelectorAll('.j-like-btn')
        .forEach(function (block) {
          var likeController = new LikeController(block);
          likeController.init();
        });
      document.querySelectorAll('.j-download-file')
        .forEach(function (button) {
          var downloadSoundFile = new DownloadSoundFile(button);
          downloadSoundFile.init();
        });
    };
    this.list = container.querySelector('.j-sound-list');
  }
  SoundItemGeneration.prototype.itemGeneration = function (items) {
    var _this = this;
    items.forEach(function (_a) {
      var src = _a.src, name = _a.name, description = _a.description, genres = _a.genres, isLike = _a.isLike, id = _a.id;
      if (_this.list) {
        var element = document.createElement('li');
        element.classList.add('sounds-block__item');
        // при изменении информации в компоненте следует изменить ее и файле src/pages/index/modules/soundsBlock/components/soundItem/soundItem.pug
        element.innerHTML = "\n                        <article class=\"sound-item j-audio\">\n                          <audio class=\"j-audio-track\" src=\"" + src + "\"></audio>\n                          <div class=\"sound-item__btn-play\">\n                            <button class=\"play-button j-audio-play j-button-click\">\n                                          <svg class=\"play-button__play-icon\">\n                                            <use xlink:href=\"#ico-play\"></use>\n                                          </svg>\n                                          <svg class=\"play-button__pause-icon\">\n                                            <use xlink:href=\"#ico-pause\"></use>\n                                          </svg>\n                            </button>\n                          </div>\n                          <div class=\"sound-item__info sound-info\">\n                            <div class=\"sound-info__main\">\n                              <div class=\"sound-info__name\">" + name + "</div>\n                              <div class=\"sound-info__time j-audio-time\">0:00</div>\n                            </div>\n                            <p class=\"sound-info__description\">" + description + "</p>\n                            <div class=\"sound-info__genres-list\">\n                            " + genres.map(function (genre) { return "<span class=\"sound-info__genre\">" + genre + "</span>"; }).join(', ') + "\n                            </div>\n                          </div>\n                          <div class=\"sound-item__actions\">\n                            <div class=\"sound-item__btn-like\">\n                              <div class=\"like-button\">\n                                <input class=\"like-button__input j-like-btn\" type=\"checkbox\" " + (isLike ? 'checked' : '') + " data-id='" + id + "'>\n                                <div class=\"like-button__icon\">\n                                              <svg>\n                                                <use xlink:href=\"#ico-like\"></use>\n                                              </svg>\n                                </div>\n                              </div>\n                            </div><button class=\"sound-item__btn-download j-download-file\" data-id='" + id + "'>\n                                          <svg>\n                                            <use xlink:href=\"#ico-download\"></use>\n                                          </svg></button><a class=\"sound-item__btn-more\" href=\"#\">\n                                          <svg>\n                                            <use xlink:href=\"#ico-more\"></use>\n                                          </svg></a>\n                          </div>\n                        </article>\n              ";
        _this.list.append(element);
      }
    });
  };
  return SoundItemGeneration;
}());
var ChooseGenre = /** @class */ (function (_super) {
  __extends(ChooseGenre, _super);
  function ChooseGenre(container) {
    var _this = _super.call(this, container) || this;
    _this.GetGenre = function (id, finallyFunc) {
      Xhr.Get(API_URL + "/genre", {
        id: id
      }).then(function (_a) {
        var data = _a.data;
        if (_this.list)
          _this.list.innerHTML = '';
        _this.itemGeneration(data);
        _this.itemInit();
      }).catch(function (e) {
        console.error(ERROR_MASSAGES, e);
      }).finally(function () {
        if (finallyFunc)
          finallyFunc();
      });
    };
    _this.toggleActive = function (target) {
      _this.tabs.forEach(function (elem) { return elem === target ? elem.classList.add(ClassEnums.ACTIVE) : elem.classList.remove(ClassEnums.ACTIVE); });
    };
    _this.tabs = container.querySelectorAll('.j-sound-tab');
    return _this;
  }
  ChooseGenre.prototype.init = function () {
    var _this = this;
    this.GetGenre('all');
    this.toggleActive(this.tabs[0]);
    this.tabs.forEach(function (tab) {
      tab.onclick = function (e) {
        var target = e.target;
        target.disabled = true;
        var id = target.dataset.id;
        _this.toggleActive(target);
        if (id) {
          _this.GetGenre(id, function () {
            target.disabled = false;
          });
        }
      };
    });
  };
  return ChooseGenre;
}(SoundItemGeneration));
var FilterForm = /** @class */ (function () {
  function FilterForm(form) {
    this.form = form;
    this.isSubmit = false;
    this.freeInput = form.querySelector('input#onlyFree');
    this.favoriteInput = form.querySelector('input#myFavorite');
    this.durationMinInput = form.querySelector('input#durationMin');
    this.durationMaxInput = form.querySelector('input#durationMax');
    this.categoriesInput = form.querySelector('input#categories');
    this.userId = sessionStorage.getItem(StorageItemEnums.AUTH);
    this.soundsContainer = document.querySelector('.j-sounds-list');
  }
  FilterForm.prototype.init = function () {
    var _this = this;
    if (this.soundsContainer)
      this.SoundItemGeneration = new SoundItemGeneration(this.soundsContainer);
    this.form.onsubmit = function (e) {
      var _a, _b, _c, _d, _e;
      e.preventDefault();
      if (!_this.isSubmit) {
        _this.isSubmit = true;
        _this.userId = sessionStorage.getItem(StorageItemEnums.AUTH);
        var isFree = (_a = _this.freeInput) === null || _a === void 0 ? void 0 : _a.checked;
        var isFavorite = (_b = _this.favoriteInput) === null || _b === void 0 ? void 0 : _b.checked;
        var durationMin = (_c = _this.durationMinInput) === null || _c === void 0 ? void 0 : _c.value;
        var durationMax = (_d = _this.durationMaxInput) === null || _d === void 0 ? void 0 : _d.value;
        var category = (_e = _this.categoriesInput) === null || _e === void 0 ? void 0 : _e.value;
        Xhr.Post(API_URL + "/filter/sounds", {
          isFree: isFree,
          isFavorite: isFavorite,
          durationMin: durationMin,
          durationMax: durationMax,
          category: category,
          userId: _this.userId
        }).then(function (_a) {
          var _b;
          var data = _a.data;
          if (_this.SoundItemGeneration && data) {
            if (_this.SoundItemGeneration.list)
              _this.SoundItemGeneration.list.innerHTML = '';
            (_b = _this.SoundItemGeneration) === null || _b === void 0 ? void 0 : _b.itemGeneration(data);
            _this.SoundItemGeneration.itemInit();
          }
        }).catch(function (e) {
          console.error(ERROR_MASSAGES, e);
        }).finally(function () {
          _this.isSubmit = false;
          _this.form.classList.remove(ClassEnums.OPEN);
        });
      }
    };
  };
  return FilterForm;
}());
// поле search
var SearchForm = /** @class */ (function () {
  function SearchForm(form) {
    this.form = form;
    this.value = '';
    this.input = form.querySelector('.j-search-input');
  }
  SearchForm.prototype.init = function () {
    var _this = this;
    if (this.input) {
      this.input.oninput = function () {
        var _a;
        _this.value = ((_a = _this.input) === null || _a === void 0 ? void 0 : _a.value) || '';
      };
    }
    this.form.onsubmit = function (e) {
      e.preventDefault();
      if (_this.input)
        _this.input.disabled = true;
      Xhr.Post(API_URL + "/search/word", {
        value: _this.value
      }).then(function (_a) {
        var data = _a.data;
        console.log(data);
        alert(data);
      }).catch(function (e) {
        console.error(ERROR_MASSAGES, e);
      }).finally(function () {
        if (_this.input) {
          _this.input.value = _this.value = '';
          _this.input.disabled = false;
        }
      });
    };
  };
  return SearchForm;
}());
// работа с формой логина
var BodyBlock = /** @class */ (function () {
  function BodyBlock() {
  }
  BodyBlock.block = function () {
    document.body.style.overflowY = StyleEnums.HIDDEN;
  };
  BodyBlock.unBlock = function () {
    document.body.style.overflowY = StyleEnums.SCROLL;
  };
  return BodyBlock;
}());
var FormLogin = /** @class */ (function () {
  function FormLogin(form) {
    var _this = this;
    this.form = form;
    this.isSubmit = false;
    this.successHandler = function (_a) {
      var _b;
      var _c = _a.response, id = _c.data.id, status = _c.status, message = _c.message, resolve = _a.resolve, reject = _a.reject;
      var isRemember = (_b = _this.rememberInput) === null || _b === void 0 ? void 0 : _b.checked;
      if (status === StatusEnums.SUCCESS) {
        if (isRemember) {
          document.cookie = "user=" + id;
        }
        sessionStorage.setItem(StorageItemEnums.AUTH, "" + id);
        if (resolve)
          resolve();
        _this.form.classList.remove(ClassEnums.OPEN);
        BodyBlock.unBlock();
        _this.changeTextIntroBtns(LOG_OUT);
        _this.removeToDefault();
      }
      else {
        if (reject)
          reject(message);
      }
    };
    this.loginBtn = document.querySelectorAll('.j-login-form-btn-open');
    this.emailInput = this.form.querySelector('.j-login-email');
    this.passwordInput = this.form.querySelector('.j-login-password');
    this.passwordMockInput = this.form.querySelector('.j-password-mock');
    this.rememberInput = this.form.querySelector('#isRemember');
    this.changeTextIntroBtns = this.changeTextIntroBtns.bind(this);
  }
  FormLogin.prototype.logInSubmit = function (resolve, reject) {
    var _this = this;
    var _a, _b;
    if (!this.isSubmit) {
      this.isSubmit = true;
      var email = ((_a = this.emailInput) === null || _a === void 0 ? void 0 : _a.value) || '';
      var password = ((_b = this.passwordInput) === null || _b === void 0 ? void 0 : _b.value) || '';
      if (email && password) {
        Xhr.Post(API_URL + "/auth/authorization", {
          email: email,
          password: password
        }).then(function (response) {
          _this.successHandler({
            response: response,
            reject: reject,
            resolve: resolve
          });
        }).catch(function (e) {
          console.log(e);
        }).finally(function () {
          _this.isSubmit = false;
        });
      }
      else {
        throw Error(ERROR_MASSAGES);
      }
    }
  };
  FormLogin.prototype.removeToDefault = function () {
    if (this.emailInput)
      this.emailInput.value = '';
    if (this.passwordInput)
      this.passwordInput.value = '';
    if (this.passwordMockInput)
      this.passwordMockInput.value = '';
    if (this.rememberInput)
      this.rememberInput.checked = false;
  };
  FormLogin.prototype.changeTextIntroBtns = function (text) {
    this.loginBtn.forEach(function (btn) {
      btn.innerHTML = text;
    });
  };
  return FormLogin;
}());
var ValidationLoginForm = /** @class */ (function (_super) {
  __extends(ValidationLoginForm, _super);
  function ValidationLoginForm(form) {
    var _this = _super.call(this, form) || this;
    _this.handelError = function (message) {
      _this.inputs.forEach(function (input) { return _this.addError(input); });
      if (_this.errorBlock) {
        _this.errorBlock.innerHTML = message;
        _this.errorBlock.classList.add(ClassEnums.VISIBLE);
      }
    };
    _this.inputs = form.querySelectorAll('input');
    _this.errorBlock = form.querySelector('.j-login-error');
    return _this;
  }
  ValidationLoginForm.prototype.init = function () {
    var _this = this;
    this.inputs.forEach(function (input) {
      input.onfocus = function () { return input.classList.remove(ClassEnums.ERROR); };
      input.onblur = function () {
        if (!input.validity.valid)
          input.classList.add(ClassEnums.ERROR);
      };
    });
    this.form.onsubmit = function (e) {
      e.preventDefault();
      if (_this.errorBlock)
        _this.errorBlock.classList.remove(ClassEnums.VISIBLE);
      _this.noValidArr = Array.from(_this.inputs).filter(function (input) { return !input.validity.valid; });
      if (_this.noValidArr.length) {
        _this.form.querySelectorAll('input').forEach(function (input) {
          if (input.validity.valid) {
            input.classList.remove(ClassEnums.ERROR);
          }
          else {
            _this.addError(input);
          }
        });
      }
      else {
        console.log(SUBMIT_MASSAGES);
        _super.prototype.logInSubmit.call(_this, undefined, _this.handelError);
        _this.inputs.forEach(function (input) {
          input.classList.remove(ClassEnums.ERROR);
        });
      }
    };
  };
  ValidationLoginForm.prototype.addError = function (target) {
    if (target)
      target.classList.add(ClassEnums.ERROR);
  };
  return ValidationLoginForm;
}(FormLogin));
// connection
document.querySelectorAll('.j-sounds-list')
  .forEach(function (block) {
    var chooseGenre = new ChooseGenre(block);
    chooseGenre.init();
  });
var filterModal = document.querySelector('.j-filter-modal');
if (filterModal) {
  var filterForm = new FilterForm(filterModal);
  filterForm.init();
}
document.querySelectorAll('.j-search')
  .forEach(function (block) {
    var searchForm = new SearchForm(block);
    searchForm.init();
  });
document.querySelectorAll('.j-login-form')
  .forEach(function (block) {
    var validationForm = new ValidationLoginForm(block);
    validationForm.init();
  });
