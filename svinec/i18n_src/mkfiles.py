# список файлов для кнопки «Офлайн» — запускать после добавления картинок/звуков (из папки svinec/i18n_src)
import os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
files=['/svinec/','/svinec/index.html','/svinec/i18n.js','/svinec/manifest.json','/svinec/icon192.png','/svinec/icon512.png','/svinec/apple-touch-icon.png','/shared/mute.js','/net.js','/update.js','/sw.js','/svinec/og.png']
for d in ['img','snd']:
    for f in sorted(os.listdir(d)): files.append(f'/svinec/{d}/{f}')
json.dump(files,open('files.json','w'));print(len(files))
