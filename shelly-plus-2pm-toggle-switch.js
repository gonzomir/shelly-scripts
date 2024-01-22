let CONFIG = {
  toggleTimeout: 5,
  links: {
    "input:0": 1,
    "input:1": 0,
  }
};

Shelly.call("Switch.SetConfig", {
  id: 0,
  config: {
    in_mode: "detached",
  },
});

Shelly.call("Switch.SetConfig", {
  id: 1,
  config: {
    in_mode: "detached",
  },
});

Shelly.call("Input.SetConfig", {
  id: 0,
  config: {
    type: "button",
  },
});

Shelly.call("Input.SetConfig", {
  id: 1,
  config: {
    type: "button",
  },
});

Shelly.addEventHandler(function (event) {
  if (event.info.event !== "btn_up") return;
  if (event.info.component.indexOf("input") === -1) return;

  let switchId = CONFIG.links[event.info.component];

  let swParams = {
    id: switchId,
    on: !Shelly.getComponentStatus('switch:' + switchId).output,
  };
  
  Shelly.call("Switch.Set", swParams);
});
