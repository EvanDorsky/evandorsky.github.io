if ENV["PROD"]
  puts "PROD is set, enter preview gen"
  Jekyll::Hooks.register :pages, :post_write do |page|
    puts "Enter page loop"
    if page.data["layout"] == "show-stub"
      puts "Enter show stub"
      path = page.destination("/")

      puts "Attempt to open #{ path }..."
      f = File.open(path)
      fd = f.read
      puts "Attempt to open #{ path }..."

      kit = IMGKit.new(fd,
        :quality => 100,
        :crop_h => 400,
      )
      kit.stylesheets << '_site/assets/css/main.css'
      outpath = path + ".png"
      t1 = Time.now
      puts "Generating preview for #{ path }..."
      file = kit.to_file(outpath)
      t2 = Time.now
      puts "Generated in #{ t2 - t1 } sec"
    end
  end
end