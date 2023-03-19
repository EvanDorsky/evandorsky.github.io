if not RbConfig::CONFIG["arch"] == "arm64-darwin21"
  Jekyll::Hooks.register :pages, :post_write do |page|
    if page.data["layout"] == "show-stub"
      path = page.destination("/")

      f = File.open(path)
      fd = f.read

      kit = IMGKit.new(fd, 
        :crop_h => 450)
      kit.stylesheets << '_site/assets/css/main.css'
      outpath = path + ".png"
      t1 = Time.now
      file = kit.to_file(outpath)
      t2 = Time.now
    end
  end
end