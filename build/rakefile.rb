 task :build do
   puts "Building CSS"
    sh 'juicer merge ../www/styles/master.css -o ../www/styles/evbmaster-min.css --force'
    puts "Building JS"
     sh 'juicer merge -i ../www/lib/js/master.js -o ../www/lib/js/evbmaster-min.js --force'
 end
 
 
