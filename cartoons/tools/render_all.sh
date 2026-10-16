set -e
names="school:Серия3_Teacher_Kick soccer:Серия4_Бомбардир snow:Серия5_Снежная_битва box:Серия6_Сумасшедший_бокс villain:Серия7_Кто_злодей balloon:Серия8_Битва_шариков train:Серия9_Грабители_поезда dino:Серия10_Ночь_в_музее ghost:Серия11_Замок_с_привидениями pirate:Серия12_Пиратский_клад pizza:Серия13_Пицца_хаос sniper:Серия14_Ночной_снайпер race:Серия15_Ночные_гонки"
mkdir -p out
for p in $names; do e=${p%%:*}; n=${p#*:}
  EP=$e node eprender2.js
  ffmpeg -v error -y -framerate 30 -i ep/f_$e/%05d.jpg -i ep/audio_$e.wav -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "out/$n.mp4"
  rm -rf ep/f_$e; echo "done $e"
done
