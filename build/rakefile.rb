 task :build do
   puts "Building CSS"
    puts "Building JS"
     sh 'juicer merge -i ../www/lib/js/master.js -o ../www/lib/js/evbmaster-min.js --force'
 end
 
 
