module Preview
  class Generator < Jekyll::Generator
    safe true

    def generate(site)
      f = File.open("_site/index.html")
      fd = f.read

      kit = IMGKit.new(fd, :quality => 100)
      kit.stylesheets << '_site/assets/css/main.css'
      # kit.to_file('out.png')
      site.collections['shows'].docs.each do |show|
        sdata = show.data
        # puts sdata
      end
    end
  end
end

