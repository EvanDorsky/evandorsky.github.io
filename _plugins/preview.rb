Jekyll::Hooks.register :site, :post_write do |site|
  puts "post write happened"

  f = File.open("_site/index.html")
  fd = f.read

  kit = IMGKit.new(fd)
  kit.stylesheets << '_site/assets/css/main.css'
  img = kit.to_img(:png)
  file = kit.to_file('out.png')
  site.collections['shows'].docs.each do |show|
    sdata = show.data
    # puts sdata
  end
end