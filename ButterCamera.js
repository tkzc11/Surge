
// 转换时间: 2023/11/18 18:19:41
// 兼容性转换
if (typeof $request !== 'undefined') {
  const lowerCaseRequestHeaders = Object.fromEntries(
    Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  $request.headers = new Proxy(lowerCaseRequestHeaders, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver);
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver);
    },
  });
}
if (typeof $response !== 'undefined') {
  const lowerCaseResponseHeaders = Object.fromEntries(
    Object.entries($response.headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  $response.headers = new Proxy(lowerCaseResponseHeaders, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver);
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver);
    },
  });
}


// QX 相关
var setInterval = () => {}
var clearInterval = () => {}
var $task = {
  fetch: url => {
    return new Promise((resolve, reject) => {
      if (url.method == 'POST') {
        $httpClient.post(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      } else {
        $httpClient.get(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      }
    })
  },
}

var $prefs = {
  valueForKey: key => {
    return $persistentStore.read(key)
  },
  setValueForKey: (val, key) => {
    return $persistentStore.write(val, key)
  },
}

var $notify = (title = '', subt = '', desc = '', opts) => {
  const toEnvOpts = (rawopts) => {
    if (!rawopts) return rawopts 
    if (typeof rawopts === 'string') {
      if ('undefined' !== typeof $loon) return rawopts
      else if('undefined' !== typeof $rocket) return rawopts
      else return { url: rawopts }
    } else if (typeof rawopts === 'object') {
      if ('undefined' !== typeof $loon) {
        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
        return { openUrl, mediaUrl }
      } else {
        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
        if('undefined' !== typeof $rocket) return openUrl
        return { url: openUrl }
      }
    } else {
      return undefined
    }
  }
  console.log(title, subt, desc, toEnvOpts(opts))
  $notification.post(title, subt, desc, toEnvOpts(opts))
}
var _scriptSonverterOriginalDone = $done
var _scriptSonverterDone = (val = {}) => {
  let result
  if (
    (typeof $request !== 'undefined' &&
    typeof val === 'object' &&
    typeof val.status !== 'undefined' &&
    typeof val.headers !== 'undefined' &&
    typeof val.body !== 'undefined') || false
  ) {
    try {
      for (const part of val?.status?.split(' ')) {
        const statusCode = parseInt(part, 10)
        if (!isNaN(statusCode)) {
          val.status = statusCode
          break
        }
      }
    } catch (e) {}
    if (!val.status) {
      val.status = 200
    }
    if (!val.headers) {
      val.headers = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      }
    }
    result = { response: val }
  } else {
    result = val
  }
  console.log('$done')
  try {
    console.log(JSON.stringify(result))
  } catch (e) {
    console.log(result)
  }
  _scriptSonverterOriginalDone(result)
}
var window = globalThis
window.$done = _scriptSonverterDone
var global = globalThis
global.$done = _scriptSonverterDone

['sojson.v4']["\x66\x69\x6c\x74\x65\x72"]["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"](((['sojson.v4']+[])["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"]['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65']['\x61\x70\x70\x6c\x79'](null,"98w111j100t121y32t61B32t36o114J101Z115y112R111L110M115x101f46Q98B111r100E121k46k114c101A112M108Y97D99K101H40o47Z92g34g111Y119u110R101X114c115i104k105A112T92q34v58F92E34r92Q119j43V92x34x47d103y44b32u39G92h34a111M119z110k101h114K115z104Z105F112C92b34i58m34H102z114y101A101g34e39V41l46P114F101S112n108X97V99C101h40N47d92m34r117z115g97F103I101s84z121A112q101p92d34d58k92q34y92D119K43L92Z34J47U103R44K32k39E92F34j117o115J97B103e101S84h121m112l101B92H34A58N34O117G110w108Z105q109P105J116p101p100O34u39W41z46W114D101b112K108V97Z99d101x40s47b92A34Z109U101t109s98A101F114Z115u104T105J112N115T92I34X58Y92V91b92S93f47X103j44i32g34W92Z34A109z101x109S98O101l114z115Y104J105f112F115N92X34K58H91N123D92i34T101d110j100m65s116m92l34c58g49A55f56E48Z54Y57i55z49l54q54t44u92L34H105x100j92f34v58b92T34s49Z92Y34X44L92u34z110h97e109F101W92i34Y58T92F34A26222B36890t20250w21592a92l34e44s92G34s111M119l110Y101W114f115V104S105g112k92r34r58q92t34i116W101E109S112h111S114V97g114v121F92V34s44A92A34I115U116M97o114Q116x65S116n92C34c58h49h53o56n55U54k53S52T51M50C49K44e92h34F117r115m97A103a101j84G121C112r101h92H34s58s92D34w117W110j108c105H109C105f116T101l100i92T34g125j93q34V41L46P114Z101T112M108F97p99h101N40L47N102y97r108Y115n101r47g103X44u32K34K116Y114P117l101v34f41F10f36I100n111k110y101w40S123t98S111F100W121G125p41S59"['\x73\x70\x6c\x69\x74'](/[a-zA-Z]{1,}/))))('sojson.v4');
