module Jekyll
  module RegexReplaceFilter
    def regex_replace(input, pattern, replacement)
      input.to_s.gsub(Regexp.new(pattern), replacement)
    end
  end
end

Liquid::Template.register_filter(Jekyll::RegexReplaceFilter)