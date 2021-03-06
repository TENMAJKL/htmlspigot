// Generated by LiveScript 1.6.0
/**
 * this is fine
 *
 * no its not
 *
 * TODO:
 * EVERYTHING
 * ERROR REPORTS
 * AND STUFF
 * OK
 */
(function(){
  var parseMethod, parsePlugin, plugins, result, i$, len$, plugin;
  parseMethod = function(node){
    var result, i$, ref$, len$, child;
    result = '';
    for (i$ = 0, len$ = (ref$ = node.children).length; i$ < len$; ++i$) {
      child = ref$[i$];
      switch (child.nodeName) {
      case 'CONSOLE':
        console.log(child);
        result += 'System.out.println("' + child.innerText + '");';
        break;
      case 'VARIABLE':
        result += child.innerText;
        break;
      case 'BROADCAST':
        result += 'Bukkit.broadcastMessage("' + child.innerText + '");';
        break;
      case 'BR':
        result += '\n';
        break;
      default:
        result = 'Unexpected token ' + child.nodeName;
      }
    }
    return result;
  };
  parsePlugin = function(node){
    var result, commands, i$, ref$, len$, child;
    result = '';
    commands = '';
    for (i$ = 0, len$ = (ref$ = node.children).length; i$ < len$; ++i$) {
      child = ref$[i$];
      switch (child.nodeName) {
      case 'ONENABLE':
        result += 'public void onEnable(){' + parseMethod(child) + '}';
        break;
      case 'ONDISABLE':
        result += 'public void onDisable(){' + parseMethod(child) + '}';
        break;
      case 'COMMAND':
        commands += 'if (command.getName().equalsIgnoreCase("' + child.attributes['name'].textContent + '")){' + parseMethod(child) + '}';
        break;
      default:
        result = 'Unexpected token ' + child.nodeName;
      }
    }
    if (commands) {
      result += 'public bool onCommand(CommandSender sender, Command command, String label, String[] args){' + commands + '}';
    }
    return result;
  };
  plugins = document.getElementsByTagName('plugin');
  result = '<pre>';
  for (i$ = 0, len$ = plugins.length; i$ < len$; ++i$) {
    plugin = plugins[i$];
    result += 'public class Main extends Javaplugin{' + parsePlugin(plugin) + '}</pre>';
  }
  document.write(result);
}).call(this);
