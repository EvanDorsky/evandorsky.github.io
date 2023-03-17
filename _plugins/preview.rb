module Preview
  class Generator < Jekyll::Generator
    safe true

    def generate(site)
      f = File.open("_site/index.html")
      fd = f.read

      IMGKit.configure do |config|
        config.wkhtmltoimage = '/path/to/wkhtmltoimage'
        config.default_options = {
          :quality => 100
        }
        config.default_format = :png
      end
      kit = IMGKit.new(fd)
      kit.stylesheets << '_site/assets/css/main.css'
      # kit.to_file('out.png')
      site.collections['shows'].docs.each do |show|
        sdata = show.data
        # puts sdata
      end
    end
  end
end

